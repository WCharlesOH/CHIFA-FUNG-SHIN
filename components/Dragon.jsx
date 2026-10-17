"use client";

import { asset } from "@/lib/base";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// El dragón 3D de Fung Shing (el mismo de fung-shing.imports-gt.com): cuerpo rojo con escamas,
// melena, garras, ojos y cuernos dorados, enroscado sobre el logo.
// El video trae la transparencia apilada: imagen arriba + máscara abajo; WebGL los junta en un lienzo.
// Al terminar se queda la pose final (dragon-fung-shing.webp) flotando y siguiendo al cursor.
const VIDEO = asset("/assets/dragon-fung-shing.mp4");
const POSE_FINAL = asset("/assets/dragon-fung-shing.webp");
const POSE_INICIO = asset("/assets/dragon-fung-shing-inicio.webp");
const VW = 1152;
const VH = 648;
const VELOCIDAD = 1.25;

const VERTICES = "attribute vec2 p;varying vec2 uv;void main(){gl_Position=vec4(p,0.,1.);uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);}";
const FRAGMENTOS =
  "precision mediump float;uniform sampler2D f;varying vec2 uv;void main(){vec3 c=texture2D(f,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(f,vec2(uv.x,.5+uv.y*.5)).r;a=smoothstep(.03,.97,a);gl_FragColor=vec4(c*a,a);}";

function prepararGL(lienzo) {
  const gl = lienzo.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;
  const sombreador = (tipo, src) => {
    const s = gl.createShader(tipo);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error("shader");
    return s;
  };
  const p = gl.createProgram();
  gl.attachShader(p, sombreador(gl.VERTEX_SHADER, VERTICES));
  gl.attachShader(p, sombreador(gl.FRAGMENT_SHADER, FRAGMENTOS));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
  gl.useProgram(p);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(p, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.viewport(0, 0, VW, VH);
  return gl;
}

export default function Dragon({ className = "" }) {
  const reduce = useReducedMotion();
  const lienzoRef = useRef(null);
  // "inicio": logo solo · "video": el dragón sale y se enrosca · "posado": pose final quieta
  const [fase, setFase] = useState("inicio");

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const giro = useTransform(sx, [-1, 1], [-2.5, 2.5]);
  const mx = useTransform(sx, [-1, 1], [-14, 14]);
  const my = useTransform(sy, [-1, 1], [-10, 10]);

  const { scrollY } = useScroll();
  const subir = useTransform(scrollY, [0, 800], [0, -120]);

  useEffect(() => {
    if (reduce) return;
    const mover = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [reduce, px, py]);

  useEffect(() => {
    if (reduce) {
      setFase("posado");
      return;
    }
    let gl;
    try {
      gl = prepararGL(lienzoRef.current);
    } catch {
      gl = null;
    }
    if (!gl) {
      setFase("posado");
      return;
    }

    let vivo = true;
    let raf = 0;
    let urlBlob = null;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.preload = "auto";
    video.playbackRate = VELOCIDAD;

    const pintar = () => {
      if (video.readyState < 2) return;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const bucle = () => {
      pintar();
      if (vivo && !video.ended) raf = requestAnimationFrame(bucle);
    };
    const terminar = () => vivo && setFase("posado");
    // Si el video no arranca a tiempo (red lenta, ahorro de batería), se muestra la pose final.
    const respaldo = setTimeout(terminar, 6000);

    (async () => {
      try {
        // Descarga completa: Safari en iPhone no precarga un <video> hasta reproducirlo.
        const r = await fetch(VIDEO, { cache: "force-cache" });
        if (!r.ok) throw new Error("video");
        urlBlob = URL.createObjectURL(await r.blob());
        video.src = urlBlob;
      } catch {
        video.src = VIDEO;
      }
      if (!vivo) return;
      video.addEventListener("ended", () => {
        pintar();
        terminar();
      }, { once: true });
      try {
        await video.play();
        video.playbackRate = VELOCIDAD;
        clearTimeout(respaldo);
        if (!vivo) return;
        setFase("video");
        raf = requestAnimationFrame(bucle);
      } catch {
        clearTimeout(respaldo);
        terminar();
      }
    })();

    return () => {
      vivo = false;
      clearTimeout(respaldo);
      cancelAnimationFrame(raf);
      video.pause();
      video.removeAttribute("src");
      video.load();
      if (urlBlob) URL.revokeObjectURL(urlBlob);
    };
  }, [reduce]);

  return (
    <motion.div
      className={`relative aspect-[16/9] ${className}`}
      style={{ y: reduce ? 0 : subir }}
      role="img"
      aria-label="Dragón rojo de melena, garras, ojos y cuernos dorados enroscado sobre el logo de Fung Shing"
    >
      <motion.div className="absolute inset-0" style={{ x: reduce ? 0 : mx, y: reduce ? 0 : my, rotate: reduce ? 0 : giro }}>
        {/* el logo solo, mientras carga el video */}
        <img
          src={POSE_INICIO}
          alt=""
          width={VW}
          height={VH}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${fase === "inicio" ? "opacity-100" : "opacity-0"}`}
        />
        <canvas
          ref={lienzoRef}
          width={VW}
          height={VH}
          className={`absolute inset-0 h-full w-full ${fase === "video" ? "opacity-100" : "opacity-0"}`}
        />
        {/* pose final: respira despacio */}
        <img
          src={POSE_FINAL}
          alt=""
          width={VW}
          height={VH}
          className={`dragon-respira absolute inset-0 h-full w-full ${fase === "posado" ? "opacity-100" : "opacity-0"}`}
        />
      </motion.div>
    </motion.div>
  );
}
