---
layout: splash
excerpt: "Robotics, electronic projects, software and amateur radio projects, all my works and activities are written here"
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
    excerpt: "plaYbox is a wooden box game for children, based on Arduino Uno, child can play with lights, buttons and sounds. I'm collecting some ideas for a new version to make it more interesting for older kids too"
    url: "/projects/playbox"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/projects/joystick/joystick-teaser.png
    alt: "JoyStick"
    title: "JoyStick"
    excerpt: "Now in version 2, this library allows you to integrate a JoyStick into your HTML5 page, created in Javascript without the use of frameworks, it is also available as an npm package"
    url: "https://github.com/bobboteck/JoyStick"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/or-logo-teaser.png
    alt: "Officine Robotiche"
    title: "Officine Robotiche"
    excerpt: "Officine Robotiche is a Social Promotion Association, whose declared purpose is to spread the knowledge of Robotics, and more generally of new technologies, through courses, events"
    url: "https://www.officinerobotiche.it"
    btn_label: "Read More"
    btn_class: "btn--primary"

  - image_path: /assets/robots/serpico/serpico-teaser.jpg
    alt: "Studying Electronics and Robotics with PICO"
    title: "SERPICO"
    excerpt: "SERPICO is the acronym for Studying Electronics and Robotics with PICO, to study the new Raspberry PI Pico, the best and perhaps most obvious choice, it seemed to me to build a Robot"
    url: "https://bobboteck.github.io/robots/serpico"
    btn_label: "Read More"
    btn_class: "btn--primary"

  - image_path: /assets/projects/cw-library/cw-library-teaser.png
    alt: "A library to send Morse message with Arduino"
    title: "CW library"
    excerpt: "Library uses callbacks functions, in this way, the user can indicate anything in the functions, simple commands for switching on or off a LED to even more complex commands on Arduino"
    url: "https://github.com/bobboteck/CWLibrary"
    btn_label: "Read More"
    btn_class: "btn--primary"

  - image_path: /assets/projects/easy-numpad/easy-numpad-teaser.png
    alt: "A Javascript numeric pad"
    title: "Easy Numpad"
    excerpt: "Easy Numpad is a pure HTML+JS+CSS control to implement a Numeric Pad in your HTML page, to be associated in a very simple way with any text field. Fork of original project by Gayan Sandamal"
    url: "https://github.com/bobboteck/easy-numpad"
    btn_label: "Read More"
    btn_class: "btn--primary"

footer: 
  - excerpt: "I'm member of [Officine Robotiche](https://www.officinerobotiche.it/) an Social Promotion Association, whose declared purpose is to spread the STEAM knowledge with Robotics"
---

{% include feature_row %}

{% include latest_post.html %}

{% include feature_row id="footer" type="center" %}
