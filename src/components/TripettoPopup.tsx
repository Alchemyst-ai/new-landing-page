// "use client";

// import { useEffect, useState } from "react";

// export default function TripettoPopup() {
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     // Show popup after 5 seconds
//     const timer = setTimeout(() => {
//       setShowForm(true);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!showForm) return;

//     // Dynamically load Tripetto scripts
//     const scripts = [
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner",
//       "https://cdn.jsdelivr.net/npm/@tripetto/runner-classic",
//       "https://cdn.jsdelivr.net/npm/@tripetto/studio",
//     ];

//     const loadedScripts: HTMLScriptElement[] = [];

//     scripts.forEach((src) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;
//       document.body.appendChild(script);
//       loadedScripts.push(script);
//     });

//     // Once scripts load, initialize Tripetto
//     const init = setTimeout(() => {
//       // @ts-ignore
//       if (window.TripettoStudio && window.TripettoClassic) {
//         // @ts-ignore
//         window.TripettoStudio.form({
//           runner: window.TripettoClassic,
//           token:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiM1l5eWpWb24wRUt4YVltWlJUdm1vL1R2NENtaHQwYVpJVEtKMEdyUzkrZz0iLCJkZWZpbml0aW9uIjoib3JPU0tpWEtWWGdSc1N1UXZTSml2SWQ3N21yVlNYVUdlQ3h0bnNuN1doaz0iLCJ0eXBlIjoiY29sbGVjdCJ9.F63lbgOgWT8pnaID9vQ_OwCxu0W_X7DRaJtmNlb31BE",
//           element: "tripetto-1xl83gd",
//         });
//       }
//     }, 1000);

//     return () => {
//       clearTimeout(init);
//       loadedScripts.forEach((s) => document.body.removeChild(s));
//     };
//   }, [showForm]);

//   if (!showForm) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="relative bg-black border-[1px] border-gray-500 rounded-2xl shadow-lg p-6 w-full max-w-lg">
//         <button
//           onClick={() => setShowForm(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>

//         <div id="tripetto-1xl83gd" className="min-h-[400px]" />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function TripettoPopup() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showForm) return;

    const scripts = [
      "https://cdn.jsdelivr.net/npm/@tripetto/runner",
      "https://cdn.jsdelivr.net/npm/@tripetto/runner-classic",
      "https://cdn.jsdelivr.net/npm/@tripetto/studio",
    ];

    const loadedScripts: HTMLScriptElement[] = [];
    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      loadedScripts.push(script);
    });

    const init = setTimeout(() => {
      // @ts-ignore
      if (window.TripettoStudio && window.TripettoClassic) {
        // @ts-ignore
        window.TripettoStudio.form({
          runner: window.TripettoClassic,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiM1l5eWpWb24wRUt4YVltWlJUdm1vL1R2NENtaHQwYVpJVEtKMEdyUzkrZz0iLCJkZWZpbml0aW9uIjoib3JPU0tpWEtWWGdSc1N1UXZTSml2SWQ3N21yVlNYVUdlQ3h0bnNuN1doaz0iLCJ0eXBlIjoiY29sbGVjdCJ9.F63lbgOgWT8pnaID9vQ_OwCxu0W_X7DRaJtmNlb31BE",
          element: "tripetto-1xl83gd",
        });

        // 👇 Observe for the button after form submission
        const observer = new MutationObserver(() => {
          const hiddenButton = document.querySelector(
            ".sc-fqkwJk.hTuWxr"
          ) as HTMLElement | null;
          if (hiddenButton) {
            hiddenButton.style.display = "none";
          }
        });

        // Observe changes in the form container
        const formContainer = document.getElementById("tripetto-1xl83gd");
        if (formContainer) {
          observer.observe(formContainer, {
            childList: true,
            subtree: true,
          });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(init);
      loadedScripts.forEach((s) => document.body.removeChild(s));
    };
  }, [showForm]);

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-black border-[1px] border-gray-500 rounded-2xl shadow-lg p-8 h-[32rem] sm:h-[35rem] overflow-hidden w-full max-w-lg">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div id="tripetto-1xl83gd" className="min-h-[400px]" />
      </div>
    </div>
  );
}
