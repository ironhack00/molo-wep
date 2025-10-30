"use client";

export function HideChrome() {
  return (
    <style jsx global>{`
      .navbar-fixed { display: none !important; }
      footer { display: none !important; }
      body { background: #000; }
    `}</style>
  );
}

export default HideChrome;


