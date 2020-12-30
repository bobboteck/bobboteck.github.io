---
layout: splash
excerpt: "Robotics and more ..."
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/intro.jpg
  actions:
  - label: "About me"
    url: "/about/"
intro: 
  - excerpt: 'Relevant projects and other information'
feature_row:
  - image_path: /assets/projects/playbox/playbox-teaser.png
    alt: "plaYbox"
    title: "plaYbox"
    excerpt: "plaYbox is a wooden box game for children"
    url: "https://github.com/bobboteck/plaYbox"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/projects/joystick/joystick-teaser.png
    alt: "JoyStick"
    title: "JoyStick"
    excerpt: "HTML5 Canvas and Vanilla JavaScript JoyStick"
    url: "https://github.com/bobboteck/JoyStick"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/or-logo-teaser.png
    alt: "Officine Robotiche"
    title: "Officine Robotiche"
    excerpt: "OR is our association, read more about us"
    url: "https://www.officinerobotiche.it"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}
