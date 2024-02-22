export default function sitemap() {
  const Baseurl = "http://localhost:3000";
  return [
    {
      url: Baseurl,
      lastModified: new Date(),
    },
    {
      url: `${Baseurl}/home`,
      lastModified: new Date(),
    },
    {
      url: `${Baseurl}/ayatrio-map`,
      lastModified: new Date(),
    },
  ];
}
