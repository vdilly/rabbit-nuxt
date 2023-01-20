<template lang="pug">
.seoVisualizer(v-show="visible", :class="reduced ? 'reduced' : null")
  .inner
    .actions
      button(@click="toggleReduce")
        svg.icon
          use(xlink:href="#chevron")
      button.close(@click="visible = !visible")
        svg.icon
          use(xlink:href="#close")
    .wrap(style="padding-top: 7rem; padding-bottom: 0")
      .inner-wrap
        .seotitle SEO Visualizer
    .wrap.google
      .inner-wrap
        h2.h2
          span Google
        p.result Environ 43 300 résultats (0,36 secondes)
        .card.google
          .url(v-html="canonical")
          .title(v-html="title")
          .description(v-html="description?.substring(0, 160)")
        .card.google(style="opacity: 0.5")
          .url https://autre-resultat.fr
          .title Autre résultat de recherche
          .description C'est un autre bloc de résultat de recherche juste pour avoir du contexte. Il n'a rien à voir avec notre site c'est vraiment juste pour visualiser.
    .wrap.twitter
      .inner-wrap
        h2.h2 
          svg.icon
            use(xlink:href="#twitter")
          span Twitter
        template(v-for="i in 2")
          //- template(v-if="i % 2 != 0")
          //-   h3 Summary short (par défaut)
          //-   p Ratio de l'image : 1x1 149x149 mini
          //- template(v-else)
          //-   h3 Summary_large_image
          //-   p Ratio de l'image : 52.41% 504x264
          .card.twitter(
            :class="i % 2 != 0 ? 'small' : null",
            style="margin-top: 20px"
          )
            .left
              .avatar.img-cover
                img(
                  src="https://vdillyprod.tech/rabbit2/wp-content/uploads/rabbit.jpg"
                )
            .right
              .head
                .author
                  .author-name John Rabbit
                  .author-id @johnrabbit
                  .time · 14 min
              .post Je tweet cette page du site !
              .body
                .image(:style="`background-image: url(${twitter_image})`")
                .bottom
                  .url(v-html="getDomain(canonical)")
                  .title(v-html="twitter_title")
                  .description(v-html="twitter_description")
    .wrap.linkedin
      .inner-wrap
        h2.h2 
          svg.icon
            use(xlink:href="#linkedin")
          span Linkedin
        //- p Ratio de l'image : 52.5% 590x310
        .card.linkedin
          .head
            .head-top
              .avatar.img-cover
                img(
                  src="https://vdillyprod.tech/rabbit2/wp-content/uploads/rabbit.jpg"
                )
              .author
                .author-name John Rabbit
                .author-id Responsable de publication
                .time 14 min •
            .head-bot
              .post Je partage cette page du site !
          .body
            .image(:style="`background-image: url(${image})`")
            .bottom
              .title(v-html="title")
              .url(v-html="getDomain(canonical) + ' • Lecture de 1 min'")
    .wrap.fb
      .inner-wrap
        h2.h2 
          svg.icon
            use(xlink:href="#fb")
          span Facebook
        //- p Ratio de l'image : 52.5% 590x310
        .card.fb
          .head
            .head-top
              .avatar.img-cover
                img(
                  src="https://vdillyprod.tech/rabbit2/wp-content/uploads/rabbit.jpg"
                )
              .author
                .author-name John Rabbit
                .time 14 min •
            .head-bot
              .post Je partage cette page du site !
          .body
            .image(:style="`background-image: url(${image})`")
            .bottom
              .url(v-html="getDomain(canonical)")
              .title(v-html="title")
    .wrap
      .inner-wrap
        .align-center
          Btn.core.small.no-arrow(@click="showLog = !showLog") 
            span Voir le log SEO
          template(v-if="showLog")
            br
            br
            br
            pre(v-html="seo", style="text-align: left")
</template>
<style lang="scss">
.seoVisualizer {
  content: "";
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 80rem;
  height: 80%;
  z-index: 99; // En dessous du header
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  box-shadow: 0 0 300px rgba(0, 0, 0, 0.9);
  // padding-top: 7rem;

  .inner {
    width: 100%;
    height: 100%;
    overflow: auto;
    // color: white;
    font-size: 1.2rem;
    line-height: 1.2;
    font-family: Arial, sans-serif;
  }
  .actions {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    button {
      margin-left: 1rem;
      background-color: $color__title-light;
      border-radius: 50%;
      height: 3rem;
      width: 3rem;
      position: relative;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 50%;
      width: 50%;
    }
  }
  .h2 {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    .icon {
      fill: $color-1;
      height: 4rem;
      width: 4rem;
      margin-right: 1rem;
    }
  }
  h3 {
    margin-bottom: 1rem;
    color: black;
  }
  .wrap {
    padding: 4rem 2rem;
  }
  .inner-wrap {
    width: 80%;
    margin: 0 auto;
  }
  .wrap.google {
  }
  .card {
  }

  // Google
  .wrap.google {
    .result {
      border-top: solid 1px rgba(0, 0, 0, 0.1);
      padding-top: 5px;
      margin-bottom: 2rem;
      color: rgb(112, 117, 122);
      font-size: 1.4rem;
    }
  }
  .card.google {
    font-family: arial, sans-serif;
    font-weight: 400;
    letter-spacing: 0;
    width: 60rem;
    margin-bottom: 3rem;
    .url {
      font-size: 14px;
      line-height: 1.3;
      color: #202124;
      font-style: normal;
      padding-bottom: 3px;
      padding-top: 1px;
    }
    .title {
      padding-top: 5px;
      color: #1a0dab;
      font-size: 2rem;
      line-height: 1.3;
      margin-bottom: 3px;
    }
    .description {
      color: #4d5156;
      line-height: 1.58;
      font-size: 14px;
    }
  }

  // Twitter
  .wrap.twitter {
    background-color: #f2f5f7;
    .h2 .icon {
      fill: #1d9bf0;
    }
  }
  .card.twitter {
    border: 1px solid #dddfe2;
    background: #fff;
    overflow: hidden;
    text-align: left;
    color: #536471;
    padding: 1.6rem;
    letter-spacing: -0.002em;
    font-size: 1.6rem;

    display: flex;

    .left {
      width: 5rem;
      flex-shrink: 0;
      margin-right: 12px;
    }
    .right {
      flex: 1;
    }

    .head {
      // padding: 5px 5px 15px 5px;
      display: flex;
      align-items: center;
    }
    .avatar {
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
    }
    .author {
      display: flex;
      align-items: center;
    }
    .author-name {
      color: #14171a;
      font-weight: 700;
      margin-right: 4px;
    }
    .author-id {
      margin-right: 4px;
      color: #657786;
    }
    .post {
      line-height: 1.38em;
      padding-top: 2px;
      color: #0f1419;
    }
    .body {
      margin-top: 12px;
      border-radius: 1.5rem;
      overflow: hidden;
      border: 1px solid #ccd6dd;
      .bottom {
        padding: 15px;
        border-top: 1px solid #ccd6dd;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
      }
      .image {
        padding-top: calc(630 / 1200 * 100%);
        background-color: #eee;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      }
      .title {
        color: #14171a;
        line-height: 20px;
        font-weight: 400;
        margin-top: 0;
      }
      .description {
        line-height: 20px;
        word-break: break-word;
        margin-top: 1px;
        overflow-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
      .url {
        line-height: 20px;
        text-transform: none;
        font-weight: 400;
      }
    }
  }
  .card.twitter + h3 {
    margin-top: 4rem;
  }
  .card.twitter.small {
    .body {
      display: flex;

      .image {
        width: 13rem;
        height: 13rem;
        padding: 0;
      }
    }
  }

  // Linkedin
  .wrap.linkedin {
    background-color: #f3f2ef;
    .h2 .icon {
      fill: #0b67c2;
    }
  }
  .card.linkedin {
    background-color: white;
    border-radius: 1.5rem;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 1.4rem;
    .head {
      padding: 1.2rem 1.6rem;
    }
    .head-top {
      display: flex;
    }
    .avatar {
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
    }
    .author {
    }
    .author-name {
      color: black;
      opacity: 0.9;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .author-id {
      color: black;
      opacity: 0.6;
      font-size: 1.2rem;
    }
    .time {
      color: black;
      opacity: 0.6;
      font-size: 1.2rem;
    }
    .post {
      line-height: 1.38em;
      padding-top: 10px;
      color: #0f1419;
    }
    .body {
      background-color: rgba(238, 243, 248, 1);
    }
    .bottom {
      padding: 8px 12px;
      .title {
        color: black;
        opacity: 0.9;
        font-weight: 600;
      }
      .url {
        margin-top: 8px;
        color: black;
        opacity: 0.6;
        font-size: 1.2rem;
      }
    }
    .image {
      width: 100%;
      padding-top: 52.5%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  // FB
  .wrap.fb {
    background-color: #f0f2f5;
    .h2 .icon {
      fill: #1b74e4;
    }
  }
  .card.fb {
    background-color: white;
    border-radius: 1.5rem;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    font-size: 1.4rem;
    .head {
      padding: 1.2rem 1.6rem;
    }
    .head-top {
      display: flex;
    }
    .avatar {
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      margin-right: 1rem;
    }
    .author {
    }
    .author-name {
      color: black;
      opacity: 0.9;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .author-id {
      color: black;
      opacity: 0.6;
      font-size: 1.2rem;
    }
    .time {
      color: black;
      opacity: 0.6;
      font-size: 1.2rem;
    }
    .post {
      line-height: 1.38em;
      padding-top: 10px;
      color: #0f1419;
    }
    .body {
      background-color: #f0f2f5;
    }
    .bottom {
      padding: 12px;
      .title {
        color: black;
        opacity: 0.9;
        font-weight: 600;
        font-size: 1.7rem;
        line-height: 2.2rem;
        margin-top: 5px;
      }
      .url {
        color: rgb(101, 103, 107);
        font-size: 1.3rem;
        text-transform: uppercase;
      }
    }
    .image {
      width: 100%;
      padding-top: 52.2%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  pre {
    font-family: sans-serif;
    word-wrap: break-word;
    overflow: hidden;
    // letter-spacing: -0.05em;
  }
}
.seoVisualizer.reduced {
  transform-origin: bottom right;
  transform: scale(0.8);
}
</style>
<script>
export default {
  data() {
    return {
      seo: {},
      reduced: false,
      visible: true,
      showLog: false,
    };
  },
  computed: {
    canonical() {
      return this.seo?.link?.find((el) => {
        return el.rel == "canonical";
      })?.href;
    },
    title() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "og_title";
      })?.content;
    },
    description() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "og_title";
      })?.content;
    },
    image() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "og_image";
      })?.content;
    },
    twitter_title() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "twitter_title";
      })?.content;
    },
    twitter_description() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "twitter_description";
      })?.content;
    },
    twitter_image() {
      return this.seo?.meta?.find((el) => {
        return el.hid == "twitter_image";
      })?.content;
    },
  },
  methods: {
    getDomain(url) {
      if (!url) return url;
      let p = new URL(url);
      let domain = p.hostname;
      return domain;
    },
    toggleReduce() {
      this.reduced = !this.reduced;
    },
    display() {
      this.visible = true;
    },
  },
  created() {
    const vm = this;
    this.$nuxt.$on("update-seoVisualizer", (seo) => {
      vm.seo = seo;
    });
  },
  mounted() {
    // Konami
    const kode = [83, 69, 79, 86, 73, 83, 85];
    const length = kode.length;
    var pos = 0;
    const vm = this;
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.keyCode === kode[pos++]) {
          if (length === pos) {
            vm.display();
            pos = 0; // ability to start over
            return false;
          }
        } else {
          pos = 0;
        }
      },
      false
    );
  },
};
</script>