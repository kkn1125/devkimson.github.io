import * as posts from "./PostMethods.js";
export { posts };

export const app = {
  appVersion: "v0.1.1",
  path: location.protocol + "//" + location.host + "/",
  repoPath: location.host.match(/127|localhost/) ? "" : "portfolio/",
  authors: ["kimson"],
  kimson: {
    repo: "https://github.com/kkn1125",
    github: "https://github.com/kkn1125",
    blog: "https://kkn1125.github.io",
    wiki: "https://kkn1125.github.io/wikimson",
    portfolio: "https://kkn1125.github.io/portfolio",
    avatar: "https://avatars.githubusercontent.com/u/71887242?v=4",
    profile: "https://kkn1125.github.io/profile",
    contact: "https://kkn1125.github.io/contact",
    comment:
      "Node 백엔드 개발자입니다. 네트워크와 서버 환경설정 및 모니터링을 리딩하고 있으며, 서버 아키텍처에 관심이 있습니다. 사람들에게 도움을 줄 수 있는 기능 개발을 지향합니다.",
  },
};

export const parseToHTML = (parseTarget) => {
    console.log(parseTarget)
  return parseTarget
    .map(({ info, line }) => {
      let lists = "";
      let detail = info.link
        ? `<span class="detail"><a class="text-danger" href="#portfolio-${info.link}">상세보기</a></span>`
        : "";
      if (line.subline) {
        lists =
          `<span class="subline">${detail}<span scroll>📖more</span>` +
          line.subline
            .map(
              (li) =>
                `<span class="li">${li.split("|").shift()}
                ${li
                  .split("|")
                  .map((z) => {
                    if (li.split("|").shift().startsWith(z)) {
                      return "";
                    } else {
                      let matchs = "";
                      if (z.match(/pm/gim)) matchs = "danger";
                      else matchs = "brand";
                      return `<span class="fs-8 tag tag-${matchs}">${z}</span>`;
                    }
                  })
                  .join(" ")} </span>`
            )
            .join("") +
          "</span>";
      } else {
        lists = "";
      }
      return `<li class="time-line">
            <span class="time-line-info text-gray">
                <span class="time-line-title pe-3">${info.title}</span>
                <span class="time-line-sub">${info.sub}</span>
                <span class="time-line-since">${info.since}</span>
            </span>
            <span class="line text-gray">
                ${info.important ? `<span class="important"></span>` : ""}
                <span class="time-line-title">${line.title}</span>
                <span class="time-line-desc">${line.desc}</span>
                ${lists}
            </span>
        </li>`;
    })
    .join("");
};

export const tagLight = (t) => `<span class="tag tag-light">${t}</span>`;
