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

  if (isDeviceIOS()) {
    // IOS
    if (isBrowserIOSSafari()) {
      // console.log("isBrowserIOSSafari");

      return [
        <>
          Bấm nút {wrapperIcon(<IIosSafariSharingApiButton2 />)} tại thanh công
          cụ.
        </>,
        <>
          Chọn {wrapperIcon(<IIosSafariAddToHomeScreenButton2 />)} từ menu đã
          hiển thị. Bạn có thể cần phải cuộn xuống để tìm mục này.
        </>,
      ];
    } else if (isBrowserIOSChrome()) {
      // console.log("isBrowserIOSChrome");

      return [
        <>
          Bấm nút {wrapperIcon(<IIosSafariSharingApiButton2 />)} tại góc phía
          trên bên phải.
        </>,
        <>
          Chọn {wrapperIcon(<IIosSafariAddToHomeScreenButton2 />)} từ menu đã
          hiển thị. Bạn có thể cần phải cuộn xuống để tìm mục này.
        </>,
      ];
    } else if (isBrowserIOSInAppFacebook() || isBrowserIOSInAppLinkedin()) {
      // console.log("isBrowserIOSInAppFacebook");
      return [
        <>Bấm nút {wrapperIcon(<IGenericMoreButton />)} phía dưới.</>,
        <>Mở trong trình duyệt.</>,
      ];
    } else if (isBrowserIOSInAppInstagram()) {
      // console.log("isBrowserIOSInAppInstagram");
      return [
        <>Bấm nút {wrapperIcon(<IUpload />)} phía dưới.</>,
        <>
          Chọn {wrapperIcon(<IOpeninsafariButton />)} từ menu đã hiển thị. Bạn
          có thể cần phải cuộn xuống để tìm mục này.
        </>,
      ];
    } else if (isBrowserIOSInAppThreads() || isBrowserIOSInAppTwitter()) {
      // console.log("isBrowserIOSInAppThreads");
      return [
        <>
          Bấm nút {wrapperIcon(<IOpeninsafariButton />)} phía dưới để mở trình
          duyệt từ hệ thống.
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
        <>Bấm nút {wrapperIcon(<IGenericMoreButton2 />)} phía trên.</>,
        <>Mở trong trình duyệt.</>,
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
          Bấm {wrapperIcon(<IIosSafariSharingApiButton2 />)}
          tại thanh công cụ.
        </>,
        <>Chọn {wrapperIcon(<IDesktopSafariDock />)} Thêm vào Dock</>,
      ];
    }
  }
  return shouldShowModal;
};

export default PwaInstallGuideContent;
