---
layout: home

hero:
  name: 'BieFlow'
  text: '这个知识库不是收藏夹，是「知识外挂」'
  tagline: 🚀 随时召唤，拒绝白学
  image:
    src: /code.png
    alt: code
  actions:
    - theme: brand
      text: 开始使用
      link: /markdown-examples
    - theme: alt
      text: 支持项目
      link: /markdown-examples
    - theme: alt
      text: GitHub
      link: https://github.com/bieber-fe

features:
  - icon: 🛠️
    title: 开源
    details: 每个人都可以自由搭建
  - icon: 🎉
    title: 免费
    details: 前端开发者都可以随时免费查阅，共同进步
  - icon: 📡
    title: 共享
    details: 任何人都可以一起补充文库，欢迎你的来到
---

<script setup>
import confetti from "../component/confetti.vue"
</script>
<!-- 引入首页碎纸屑效果 -->

<confetti />
