export default process.env.NODE_ENV === "development"
  ? function (url: string) {
      if (url.startsWith("http") || url.startsWith("blob:")) return url;
      return process.env.DEV_API_HOST + url;
    }
  : function (url: string) {
      return url;
    };
