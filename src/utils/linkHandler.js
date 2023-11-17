import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLinkClickHandlers(ref) {
   const navigate = useNavigate();

   useEffect(() => {
      if (!ref.current) return;

      const links = ref.current.querySelectorAll("a");
      links.forEach((link) => {
         link.classList.add("text-emerald-700");
         link.addEventListener("click", handleLinkClick);
      });

      return () => {
         links.forEach((link) =>
            link.removeEventListener("click", handleLinkClick)
         );
      };

      function handleLinkClick(event) {
         const link = event.currentTarget;
         const href = link.getAttribute("href");
         const target = link.getAttribute("target");
         const url = new URL(href || "", window.location.origin);

         const isInternalLink = url.origin === window.location.origin;
         const isOpenedInSameWindow = !target || target === "_self";
         const isLeftButtonClick = event.button === 0;

         // E.g. Ctrl-clicking a link opens it in a new tab
         // so let the browser handle such clicks
         const isModifierKeyPressed =
            event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

         if (
            isInternalLink &&
            isOpenedInSameWindow &&
            isLeftButtonClick &&
            !isModifierKeyPressed
         ) {
            event.preventDefault();
            navigate(url.pathname + url.search + url.hash);
         }
      }
   }, [navigate, ref]);
}
