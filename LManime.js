// ==MiruExtension==
// @name         LManime
// @version      v0.0.1
// @author       Esl4mali
// @lang         all
// @license      MIT
// @icon         https://lmanime.com/wp-content/uploads/2022/08/lm-big-4-01.png
// @package      LManime.com
// @type         bangumi
// @webSite      https://lmanime.com
// ==/MiruExtension==

export default class extends Extension {
    async search(kw) {
      const res = await this.request(`/api/DramaList/Search?q=${kw}&type=0`);
      return res.map((item) => ({
        title: item.title,
        url: item.id.toString(),
        cover: item.thumbnail,
      }));
    }
  
    async latest(page) {
      const res = await this.request(
        `/api/DramaList/List?page=${page}&type=0&sub=0&country=0&status=0&order=2&pageSize=40`
      );
      return res.data.map((item) => ({
        title: item.title,
        url: item.id.toString(),
        cover: item.thumbnail,
      }));
    }
  
    async detail(url) {
      const res = await this.request(`/api/DramaList/Drama/${url}?isq=true`);
      return {
        title: res.title,
        cover: res.thumbnail,
        desc: res.description,
        episodes: [
          {
            title: "Directory",
            urls: res.episodes.reverse().map((item) => ({
              name: `Episode ${item.number}`,
              url: item.id.toString(),
            })),
          },
        ],
      };
    }
  
    async watch(url) {
      const res = await this.request(
        `/api/DramaList/Episode/${url}.png?err=false&ts=&time=`
      );
      const subRes = await this.request(`/api/Sub/${url}`);
      return {
        type: "hls",
        url: res.Video,
        subtitles: subRes.map((item) => ({
          title: item.label,
          url: item.src,
          language: item.land,
        })),
      };
    }
  }
  