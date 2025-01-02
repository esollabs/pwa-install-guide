import {
  isBrowserAndroidChrome,
  isBrowserAndroidFacebook,
  isBrowserIOSChrome,
  isBrowserIOSInAppFacebook,
  isBrowserIOSInAppInstagram,
  isBrowserIOSInAppLinkedin,
  isBrowserIOSInAppThreads,
  isBrowserIOSInAppTwitter,
  isBrowserIOSSafari,
  isDesktopChrome,
  isDesktopEdge,
  isDesktopSafari,
  isDeviceAndroid,
  isDeviceIOS,
} from "@/utils/devices";
import {
  IDesktopSafariDock,
  IGenericMoreButton,
  IGenericMoreButton2,
  IIosSafariAddToHomeScreenButton2,
  IIosSafariSharingApiButton2,
  IOpeninsafariButton,
  IUpload,
} from "../icon/install-icon";
import { getPWADisplayMode } from "@/utils/common";
import DefaultWrapperIcon from "../icon/defaut-wrapper-icon";
import { JSX } from "react";

const PwaInstallGuideContent = ({
  iconWrapper = DefaultWrapperIcon,
}: {
  iconWrapper?: ({ children }: { children: JSX.Element }) => JSX.Element;
}) => {
  let shouldShowModal = getPWADisplayMode() === "browser";
  const wrapperIcon = (children: JSX.Element) => (
    <span className="inline-flex max-w-[32px] items-center">
      {iconWrapper({ children })}
    </span>
  );

  if (!shouldShowModal) {
    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  if (isDeviceIOS()) {
    // IOS
    if (isBrowserIOSSafari()) {
      // console.log("isBrowserIOSSafari");

      return [
        <>
          Press the button {wrapperIcon(<IIosSafariSharingApiButton2 />)} at the
          toolbar.
        </>,
        <>
          Choose {wrapperIcon(<IIosSafariAddToHomeScreenButton2 />)} from the
          displayed menu. You may need to scroll down to find this item.
        </>,
      ];
    } else if (isBrowserIOSChrome()) {
      // console.log("isBrowserIOSChrome");

      return [
        <>
          Press the button {wrapperIcon(<IIosSafariSharingApiButton2 />)} in the
          upper right corner.
        </>,
        <>
          Choose {wrapperIcon(<IIosSafariAddToHomeScreenButton2 />)} from the
          displayed menu. You may need to scroll down to find this item.
        </>,
      ];
    } else if (isBrowserIOSInAppFacebook() || isBrowserIOSInAppLinkedin()) {
      // console.log("isBrowserIOSInAppFacebook");
      return [
        <>Press the button {wrapperIcon(<IGenericMoreButton />)} below.</>,
        <>Open in browser.</>,
      ];
    } else if (isBrowserIOSInAppInstagram()) {
      // console.log("isBrowserIOSInAppInstagram");
      return [
        <>Press the button {wrapperIcon(<IUpload />)} below.</>,
        <>
          Choose {wrapperIcon(<IOpeninsafariButton />)} from the displayed menu.
          You may need to scroll down to find this item.
        </>,
      ];
    } else if (isBrowserIOSInAppThreads() || isBrowserIOSInAppTwitter()) {
      // console.log("isBrowserIOSInAppThreads");
      return [
        <>
          Press the button {wrapperIcon(<IOpeninsafariButton />)} below to open
          the browser from the system.
        </>,
      ];
    } else {
      // console.log("else");
      shouldShowModal = false;
    }
  } else if (isDeviceAndroid()) {
    // Android
    if (isBrowserAndroidChrome()) {
      // console.log("isBrowserAndroidChrome");
      shouldShowModal = true;
      // return [
      //   <>
      //     Bấm {wrapperIcon(<IAndroidChromeMoreButton2 />)} tại thanh trình
      //     duyệt.
      //   </>,
      //   <>
      //     Bấm {wrapperIcon(<IAndroidChromeAddToHomeScreenButton2 />)} thêm vào
      //     màn hình chính
      //   </>,
      // ];
    } else if (isBrowserAndroidFacebook()) {
      // console.log("isBrowserAndroidFacebook");
      return [
        <>Press the button {wrapperIcon(<IGenericMoreButton2 />)} above.</>,
        <>Open in browser.</>,
      ];
    } else {
      // console.log("else");
      shouldShowModal = false;
    }
  } else {
    // Desktop
    if (isDesktopChrome() || isDesktopEdge()) {
      // console.log("isDesktopChrome");
      shouldShowModal = true;
    } else if (isDesktopSafari()) {
      // console.log("isDesktopSafari");
      return [
        <>
          Press {wrapperIcon(<IIosSafariSharingApiButton2 />)} at the toolbar.
        </>,
        <>Choose {wrapperIcon(<IDesktopSafariDock />)} Add to Dock</>,
      ];
    }
  }
  return shouldShowModal;
};

export default PwaInstallGuideContent;
