import InstallPWAGuideModal from "./components/pwa-install-guide/pwa-install-guide-modal";

// const data = {
//   layout: {
//     modal: "./desktop_chrome.png",
//     popup: "./popup.png",
//   },
//   desktop: {
//     chrome: "./desktop_chrome.png",
//     safari: "./desktop_safari.png",
//   },
//   android: {
//     chrome: "./android_chrome.png",
//     browser: "./android_application_browser.png",
//   },
//   ios: {
//     safari: "./ios_safari.png",
//     chrome: "./ios_chrome.png",
//   },
// };

function App() {
  return (
    <div className="relative h-[100dvh] w-full overflow-auto bg-[#00000F]">
      <div
        className="absolute bottom-0 left-0 right-0 h-full opacity-80"
        style={{
          backgroundImage: "url(/decoration.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      ></div>

      <div className="relative flex size-full flex-col items-center justify-center gap-2">
        <p className="text-2xl font-bold text-white">
          "PWA Install Guide" Package
        </p>
        <p className="relative px-4 text-center text-base font-normal text-white after:absolute after:-bottom-4 after:left-0 after:right-0 after:h-0.5 after:translate-y-full after:bg-[linear-gradient(90deg,rgba(124,93,248,0),#7c5df8_49.77%,rgba(124,93,248,0))] after:content-['']">
          A simple guide to add PWA installation functionality with customizable
          UI or hooks.
        </p>
      </div>

      <InstallPWAGuideModal type="modal" />
    </div>
  );
}

export default App;
