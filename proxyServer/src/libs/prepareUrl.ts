export default function(url: string) {
  return url.startsWith('http') ? url : process.env.DEV_API_HOST + url;
}
