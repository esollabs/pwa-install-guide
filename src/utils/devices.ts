const userAgent = window.navigator.userAgent;

export function _matchesUserAgent(regex: RegExp): boolean {
  return !!userAgent.match(regex);
}

export function isDeviceAndroid() {
  return !!_matchesUserAgent(/Android/);
}

export function isDeviceIOS() {
  return _matchesUserAgent(/iPhone|iPad|iPod/) || isBrowserIOSIPadSafari();
}

export function isBrowserIOSIPadSafari() {
  return !!(
    userAgent.match(/Macintosh/) &&
    navigator.maxTouchPoints &&
    navigator.maxTouchPoints > 1
  );
}

export function isBrowserIOSSafari() {
  return (
    isDeviceIOS() &&
    _matchesUserAgent(/Safari/) &&
    !isBrowserIOSChrome() &&
    !isBrowserIOSFirefox() &&
    !isBrowserIOSInAppFacebook() &&
    !isBrowserIOSInAppLinkedin() &&
    !isBrowserIOSInAppInstagram() &&
    !isBrowserIOSInAppThreads() &&
    !isBrowserIOSInAppTwitter()
  );
}

export function isBrowserIOSChrome() {
  return isDeviceIOS() && _matchesUserAgent(/CriOS/);
}

export function isBrowserIOSFirefox() {
  return isDeviceIOS() && _matchesUserAgent(/FxiOS/);
}

export function isBrowserIOSInAppFacebook() {
  if (!isDeviceIOS()) {
    return false;
  }
  return _matchesUserAgent(/FBAN|FBAV/);
}

export function isBrowserIOSInAppLinkedin() {
  if (!isDeviceIOS()) {
    return false;
  }

  return _matchesUserAgent(/LinkedInApp/);
}

export function isBrowserIOSInAppInstagram() {
  if (!isDeviceIOS()) {
    return false;
  }

  // TODO: this is incompatible with Instagram/Threads mobile website links.
  // TODO: this solution only works with first-level links
  if (window.document.referrer.match("//l.instagram.com/")) {
    return true;
  }

  return false;
}

export function isBrowserIOSInAppThreads() {
  return isBrowserIOSInAppInstagram();
}

export function isBrowserIOSInAppTwitter() {
  if (!isDeviceIOS()) {
    return false;
  }

  // TODO: this solution is incompatible with Twitter mobile website links
  // TODO: this solution only works with first-level links
  return !!window.document.referrer.match("//t.co/");
}

export function isBrowserAndroidChrome() {
  return (
    isDeviceAndroid() &&
    !!_matchesUserAgent(/Chrome/) &&
    !isBrowserAndroidFacebook() &&
    !isBrowserAndroidSamsung() &&
    !isBrowserAndroidFirefox()
  );
}

export function isBrowserAndroidFacebook() {
  return isDeviceAndroid() && _matchesUserAgent(/FBAN|FBAV/);
}

export function isBrowserAndroidSamsung() {
  return isDeviceAndroid() && _matchesUserAgent(/SamsungBrowser/);
}

export function isBrowserAndroidFirefox() {
  return isDeviceAndroid() && _matchesUserAgent(/Firefox/);
}

export function isDesktopWindows() {
  return userAgent.includes("Windows");
}

export function isDesktopMac() {
  return userAgent.includes("Macintosh");
}

export function isDesktopChrome() {
  const isChrome = userAgent.includes("Chrome") && !userAgent.includes("Edg"); // Exclude Edge browser
  const isDesktop =
    userAgent.includes("Windows") ||
    userAgent.includes("Macintosh") ||
    userAgent.includes("Linux");

  return isChrome && isDesktop;
}

export function isDesktopSafari() {
  const isSafari =
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Edg");
  const isDesktop =
    userAgent.includes("Macintosh") || userAgent.includes("Windows");

  return isSafari && isDesktop;
}

export function isDesktopEdge() {
  return userAgent.includes("Edg/");
}
