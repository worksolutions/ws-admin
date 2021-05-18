export default function(url: string) {
  if (url.startsWith("http")) return url;

  if (process.env.API_SERVER_STATIC_HOST !== undefined) return process.env.API_SERVER_STATIC_HOST + url;

  if (process.env.API_SERVER_HOST !== undefined) return process.env.API_SERVER_HOST + url;

  return url;
}
