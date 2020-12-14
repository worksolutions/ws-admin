export default function (url: string) {
  return url.startsWith("http") ? url : process.env.API_SERVER_HOST + url;
}
