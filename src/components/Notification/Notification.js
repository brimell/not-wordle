import React from "react";
import gsap from "gsap";
import "./Notification.scss";
export default function Notification(props) {
  const { to, from, set } = gsap;

  window.addEventListener('load', () => {

    const banner = document.querySelector(".banner");
    const button = banner.querySelectorAll("button");
    const cookie = banner.querySelector(".cookie");
    const eyePath = cookie.querySelectorAll(".eye path");
    const mouthPath = cookie.querySelector(".mouth path");
    const pieceLeft = cookie.querySelectorAll(".piece.left");
    const pieceRight = cookie.querySelectorAll(".piece.right");

    button.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          to(cookie, {
            keyframes: [
              {
                "--crack-offset": "0px",
                duration: 0.4,
              },
            ],
          });
          to(cookie, {
            repeat: 2,
            keyframes: [
              {
                "--rotate": "-3deg",
                duration: 0.05,
              },
              {
                "--rotate": "3deg",
                duration: 0.05,
              },
              {
                "--rotate": "0deg",
                duration: 0.05,
              },
            ],
            onComplete: () => {
              to(cookie, {
                "--top-y": "-16px",
                duration: 0.3,
                ease: "power4.out",
              });
              to([...pieceRight, ...pieceLeft], {
                y: () => {
                  return random(-16, -24);
                },
                x: () => {
                  return random(12, -12);
                },
                duration: 0.5,
              });
              to([...pieceLeft, ...pieceRight], {
                rotateZ: () => {
                  return random(90, -90);
                },
                opacity: 0,
                duration: 0.2,
                delay: 0.25,
              });
            },
          });
          to(eyePath, {
            keyframes: [
              {
                morphSVG:
                  "M8.99929 4.99965C7.99929 10.2086 7.20894 7 5 7C2.79106 7 2 10.2086 1 4.99965C1 2.7907 2.79106 1 5 1C7.20894 1 8.99929 2.7907 8.99929 4.99965Z",
                duration: 0.15,
                delay: 0.15,
                onStart: () => {
                  to(cookie, {
                    keyframes: [
                      {
                        "--eyeball-scale": ".5",
                        "--eyeball-y": "-4px",
                        "--mouth-y": "1px",
                        duration: 0.15,
                      },
                      {
                        "--eyeball-x": "-3px",
                        duration: 0.15,
                      },
                      {
                        "--eyeball-x": "-1px",
                        duration: 0.15,
                      },
                      {
                        "--eyeball-x": "-2px",
                        duration: 0.15,
                        onComplete: () => {
                          to(banner, {
                            opacity: 0,
                            y: 16,
                            duration: 0.2,
                            onComplete: () => {
                              setTimeout(() => {
                                set(cookie, {
                                  clearProps: true,
                                });
                                set(eyePath, {
                                  morphSVG:
                                    "M8.99929 4.99965C8.99929 7.20859 7.20859 8.99929 4.99964 8.99929C2.7907 8.99929 1 7.20859 1 4.99965C1 2.7907 2.7907 1 4.99964 1C7.20859 1 8.99929 2.7907 8.99929 4.99965Z",
                                });
                                set([...pieceRight, ...pieceLeft], {
                                  clearProps: true,
                                });
                                set(mouthPath, {
                                  morphSVG:
                                    "M6 8.5C3.4154 8.5 1.5 5.5 1.5 5.5H10.5C10.5 5.5 8.5846 8.5 6 8.5Z",
                                });
                                to(banner, {
                                  opacity: 1,
                                  y: 0,
                                  duration: 0.2,
                                });
                              }, 2000);
                            },
                          });
                        },
                      },
                    ],
                  });
                },
              },
            ],
          });
          to(mouthPath, {
            keyframes: [
              {
                morphSVG:
                  "M6 5.45001C3.4154 5.45001 1.5 5.50001 1.5 5.50001H10.5C10.5 5.50001 8.5846 5.45001 6 5.45001Z",
                duration: 0.15,
              },
              {
                morphSVG:
                  "M6 1.5C3.4154 1.5 1.5 5.5 1.5 5.5H10.5C10.5 5.5 8.5846 1.5 6 1.5Z",
                duration: 0.15,
                delay: 0.15,
              },
            ],
          });
        });
      });
  });

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  

  return (
    <div classname="banner">
      <div classname="cookie">
        <svg classname="piece left first" viewBox="0 0 6 6">
          <path d="M2.7712 3.24799C2.49222 3.48546 2.25276 3.56275 2.0468 3.54193C1.83835 3.52086 1.60578 3.39352 1.35475 3.09775C1.32929 3.06776 1.30223 3.03622 1.27405 3.00337C1.14064 2.84789 0.98195 2.66294 0.847989 2.47237C0.767445 2.35779 0.701633 2.24904 0.658271 2.1518C0.613433 2.05125 0.602085 1.98386 0.605059 1.945C0.605871 1.9344 0.615589 1.89561 0.682208 1.82564C0.746183 1.75846 0.839337 1.68684 0.954432 1.61004C1.04061 1.55253 1.1302 1.4978 1.22128 1.44216C1.25177 1.42354 1.28242 1.40481 1.31317 1.38585C1.42939 1.31416 1.55181 1.23617 1.6446 1.15718C1.92359 0.919702 2.16305 0.842405 2.36903 0.863218C2.57748 0.884281 2.81005 1.0116 3.06108 1.30737C3.15208 1.4146 3.18572 1.55517 3.18078 1.74639C3.17737 1.87881 3.15862 2.00137 3.13819 2.13496C3.12652 2.21129 3.11429 2.29122 3.10406 2.37865C3.06203 2.73781 2.97771 3.07221 2.7712 3.24799Z" />
        </svg>
        <svg classname="piece left second" viewBox="0 0 6 6">
          <path d="M3.41877 4.34598C3.25832 4.4149 3.05082 4.4003 2.76355 4.20721C2.47228 4.01145 2.13466 3.65292 1.75621 3.11101C1.72207 3.06213 1.68536 3.00983 1.64671 2.95478C1.46019 2.68906 1.22858 2.35912 1.02389 2.0393C0.900476 1.84648 0.789635 1.6616 0.705989 1.5005C0.621272 1.33733 0.575794 1.21961 0.562939 1.15003C0.58648 1.13809 0.632947 1.12218 0.714191 1.10853C0.786405 1.09639 0.861375 1.08938 0.943475 1.0817C0.972457 1.07899 1.00233 1.07619 1.03328 1.07306C1.13458 1.06281 1.27078 1.04742 1.37711 1.00175C1.53757 0.932828 1.74507 0.947428 2.03234 1.1405C2.32361 1.33626 2.66123 1.69477 3.03968 2.23668C3.34391 2.67231 3.3799 3.03115 3.41841 3.41501C3.42664 3.49709 3.43499 3.58032 3.4461 3.66569C3.47107 3.85758 3.48486 4.04125 3.46883 4.18288C3.46088 4.25308 3.44701 4.29854 3.43354 4.32493C3.42733 4.33711 3.42251 4.34262 3.42064 4.3445C3.41938 4.34577 3.41903 4.34589 3.41884 4.34596C3.41882 4.34597 3.41879 4.34597 3.41877 4.34598Z" />
        </svg>
        <svg classname="piece left third" viewBox="0 0 6 6">
          <path d="M1.88258 2.82165C1.68571 2.99149 1.53057 3.03982 1.4116 3.03138C1.29397 3.02305 1.15245 2.95495 0.991176 2.76217C0.973255 2.74075 0.954403 2.71847 0.934921 2.69544C0.844059 2.58805 0.739488 2.46446 0.651753 2.33625C0.599125 2.25934 0.558447 2.18896 0.532976 2.12821C0.50891 2.07081 0.505164 2.03786 0.505506 2.0242C0.507356 2.0202 0.515919 2.00229 0.546947 1.96967C0.589585 1.92486 0.653164 1.87464 0.735084 1.8184C0.796261 1.7764 0.85946 1.73644 0.924784 1.69515C0.946903 1.68116 0.969266 1.66702 0.991876 1.6526C1.07531 1.59938 1.16688 1.53934 1.2377 1.47824C1.43458 1.30839 1.58972 1.26006 1.7087 1.26849C1.82633 1.27682 1.96785 1.34491 2.12912 1.53768C2.17046 1.5871 2.19186 1.66082 2.18457 1.79015C2.17948 1.88042 2.16475 1.96095 2.14795 2.05279C2.1379 2.10773 2.12711 2.16672 2.1172 2.23426C2.07985 2.48878 2.01506 2.70735 1.88258 2.82165Z" />
        </svg>

        <svg classname="piece right first" viewBox="0 0 6 6">
          <path d="M0.808026 4.14106C0.697138 4.00615 0.653362 3.8028 0.758781 3.47311C0.865663 3.13884 1.11595 2.71471 1.53098 2.20029C1.56842 2.15388 1.60842 2.10406 1.65053 2.0516C1.85377 1.79844 2.10614 1.48409 2.35628 1.19841C2.50709 1.02617 2.65378 0.868216 2.7852 0.743003C2.91831 0.616187 3.0187 0.539717 3.08194 0.507989C3.09997 0.527271 3.1282 0.567467 3.16394 0.641692C3.19571 0.707668 3.22333 0.777716 3.25358 0.854427C3.26426 0.881507 3.27526 0.909417 3.28689 0.938271C3.32496 1.03271 3.37767 1.15923 3.45115 1.24862C3.56205 1.38353 3.60583 1.58689 3.50042 1.91658C3.39355 2.25084 3.14327 2.67497 2.72824 3.18939C2.3946 3.60293 2.05999 3.73746 1.70205 3.88137C1.62551 3.91214 1.5479 3.94334 1.46901 3.9778C1.29167 4.05524 1.11911 4.11964 0.978619 4.1437C0.908979 4.15562 0.861456 4.15496 0.832362 4.14938C0.818932 4.1468 0.812294 4.14371 0.809964 4.14243C0.808398 4.14158 0.808186 4.14128 0.808069 4.14111C0.808054 4.14109 0.808041 4.14107 0.808026 4.14106Z" />
        </svg>
        <svg classname="piece right second" viewBox="0 0 6 6">
          <path d="M2.70059 2.64136C2.46134 2.76484 2.13517 2.89564 1.84156 2.92885C1.5464 2.96224 1.36117 2.89394 1.26397 2.72121C1.25045 2.69718 1.2289 2.62181 1.21975 2.4773C1.2113 2.34363 1.21497 2.18312 1.22615 2.01696C1.24853 1.68423 1.29918 1.35453 1.32618 1.22262C1.34456 1.13282 1.43856 0.929989 1.57516 0.717771C1.6403 0.616577 1.70892 0.523007 1.77274 0.449687C1.7976 0.421122 1.81952 0.398221 1.83823 0.380186C1.84397 0.426349 1.84824 0.480898 1.852 0.544768C1.85419 0.582023 1.85617 0.622525 1.85827 0.665347C1.86486 0.799893 1.87258 0.957347 1.89139 1.10896C1.91635 1.31015 1.96375 1.53344 2.07226 1.72629C2.15676 1.87646 2.30061 1.9628 2.41738 2.01665C2.52537 2.06646 2.64667 2.10413 2.74453 2.13452C2.75485 2.13772 2.76492 2.14085 2.77468 2.1439C2.85567 2.16921 2.9131 2.18873 2.95294 2.20595C2.927 2.29841 2.89626 2.38592 2.85745 2.46092C2.80739 2.55766 2.7541 2.61375 2.70059 2.64136ZM3.00365 2.23307C3.00364 2.23307 3.00339 2.23289 3.00296 2.2325L3.00365 2.23307Z" />
        </svg>
        <svg classname="piece right third" viewBox="0 0 6 6">
          <path d="M0.785419 2.23993C0.62072 2.08292 0.567012 1.9372 0.57476 1.79749C0.583119 1.64677 0.665624 1.45336 0.875986 1.21611C0.897312 1.19206 0.919704 1.16657 0.943014 1.14004C1.0532 1.01463 1.1839 0.865863 1.3195 0.734951C1.40109 0.656174 1.47824 0.590089 1.54701 0.543032C1.6099 0.49999 1.65009 0.483847 1.66943 0.47895C1.67489 0.48133 1.68511 0.486722 1.7008 0.498357C1.74125 0.528339 1.79024 0.579556 1.84879 0.653038C1.89225 0.707572 1.93343 0.764469 1.97683 0.824423C1.99173 0.845003 2.00689 0.865943 2.02249 0.887271C2.07828 0.963546 2.14439 1.05145 2.21293 1.11679C2.37763 1.2738 2.43135 1.41953 2.4236 1.55925C2.41525 1.70996 2.33275 1.90338 2.1224 2.14062C2.04883 2.22359 1.95303 2.26687 1.82308 2.29082C1.72928 2.30811 1.64597 2.31246 1.55069 2.31742C1.49363 2.3204 1.43228 2.3236 1.36182 2.32994C1.23706 2.34116 1.11455 2.34487 1.00721 2.32922C0.899428 2.31351 0.828999 2.28148 0.785419 2.23993ZM1.6646 0.477221C1.6646 0.477202 1.66489 0.477255 1.66549 0.47744L1.6646 0.477221Z" />
        </svg>

        <svg classname="bottom" viewBox="0 0 40 40">
          <path
            d="M2.48441 15.349L4.59888 14.2917C4.85436 14.164 5.15227 14.1516 5.41748 14.2577L7.01918 14.8984C7.18551 14.9649 7.36666 14.9855 7.54369 14.9581L10.2619 14.5369C10.4184 14.5127 10.5669 14.4516 10.6952 14.3587L11.5413 13.7463C11.7211 13.6161 11.9391 13.5495 12.161 13.5569L14.3581 13.6301C14.4823 13.6342 14.6046 13.6615 14.7187 13.7104L17.4423 14.8777C17.6283 14.9573 17.834 14.9788 18.0324 14.9391L21.9368 14.1582C22.1549 14.1146 22.3812 14.1449 22.5801 14.2444L23.6005 14.7545C23.9063 14.9074 24.269 14.8935 24.5622 14.7176L26.009 13.8495C26.2364 13.713 26.5087 13.6725 26.766 13.7368L27.8235 14.0012C28.0551 14.0591 28.2997 14.0322 28.5132 13.9255L29.5533 13.4054C29.8349 13.2647 30.1662 13.2647 30.4478 13.4054L31.3715 13.8673C31.653 14.0081 31.9844 14.0081 32.2659 13.8673L34.1755 12.9125C34.4127 12.7939 34.6873 12.7744 34.9389 12.8583L37.004 13.5466C37.7656 15.5521 38.1825 17.7274 38.1825 20C38.1825 23.8914 37.0826 25.6791 35.0007 28.6364C34.6886 29.0797 34.3993 29.6008 34.1039 30.1327C33.57 31.0943 33.0165 32.0912 32.2734 32.7273C30.9167 33.8888 28.9323 35.1843 27.2734 35.9091C26.4233 36.2805 25.8042 36.7658 25.2198 37.2239C24.2732 37.9658 23.4177 38.6364 21.8189 38.6364C20.3379 38.6364 18.6993 37.7667 17.1864 36.9638C16.4123 36.553 15.6711 36.1596 15.0007 35.9091C14.1012 35.573 13.0618 35.3409 12.004 35.1048C9.86524 34.6273 7.65102 34.1329 6.36435 32.7273C5.67437 31.9735 5.23043 30.8685 4.80197 29.802C4.57255 29.231 4.34756 28.671 4.09162 28.1818C2.77465 25.665 2.27344 23.0375 2.27344 20V19.9479C2.27342 18.3715 2.27341 16.8422 2.40516 15.3844C2.43202 15.3738 2.45846 15.3619 2.48441 15.349Z"
            classname="background"
          />
          <path
            classname="shine"
            d="M33.4865 13.257C33.5807 13.7585 33.6395 14.3329 33.6385 15C33.6369 16.065 32.2344 15.8824 31.0723 15.731C30.2504 15.6239 29.5487 15.5325 29.5476 15.9091C29.5464 16.3018 29.8295 16.4247 30.2121 16.5909C30.7153 16.8093 31.3904 17.1024 31.8176 18.1818C32.2653 19.3131 33.4697 19.7053 34.4165 20.0136C35.3718 20.3246 36.0649 20.5503 35.454 21.3636C34.526 22.5991 33.9018 22.9047 33.4877 23.1075C32.8833 23.4034 32.7267 23.4801 32.7267 25.9091C32.7267 27.6666 30.3301 27.086 28.1123 26.5487C26.497 26.1574 24.9766 25.789 24.5459 26.3637C23.7675 27.4024 24.4695 28.0988 25.3316 28.954C25.5208 29.1417 25.7178 29.3371 25.9085 29.5455C26.9368 30.6688 25.1785 31.47 23.7352 32.1278C22.4793 32.7001 21.4619 33.1637 22.7267 33.6364C23.9989 34.1118 23.262 35.4768 22.5726 36.7538C22.1888 37.4649 21.8197 38.1487 21.8203 38.6364C23.4191 38.6364 24.2746 37.9658 25.2212 37.2239C25.8056 36.7658 26.4247 36.2805 27.2749 35.9091C28.9337 35.1843 30.9181 33.8888 32.2749 32.7273C33.0179 32.0912 33.5714 31.0943 34.1053 30.1327C34.4007 29.6008 34.69 29.0797 35.0021 28.6364C37.084 25.6791 38.1839 23.8914 38.1839 20C38.1839 17.7276 37.767 15.5525 37.0056 13.5471L34.9389 12.8583C34.6873 12.7744 34.4127 12.7939 34.1755 12.9125L33.4865 13.257Z"
          />
          <g classname="dark">
            <path d="M2.48441 15.3489L4.59888 14.2917C4.85436 14.164 5.15227 14.1516 5.41748 14.2577L7.01918 14.8983C7.18551 14.9649 7.36666 14.9855 7.54369 14.9581L8.48555 14.8121C8.31921 15.525 7.66512 15.9791 7.06489 16.3957C6.93431 16.4864 6.80627 16.5752 6.68636 16.6646C6.06807 17.1255 5.26433 17.6213 4.45484 17.53C3.04872 17.3714 2.26695 16.672 2.12383 15.4508C2.2491 15.4399 2.37147 15.4054 2.48441 15.3489Z" />
            <path d="M28.6948 26.5568C27.4697 26.6701 26.1259 26.7943 25.0223 27.8459C22.5495 30.2021 22.0841 32.2332 23.6421 33.8684C23.8794 34.1175 24.1172 34.5184 24.371 34.9463C24.9334 35.8945 25.5743 36.9751 26.463 36.8291C27.6909 36.6273 29.7571 34.6434 31.0658 33.3868L31.0694 33.3833L31.0702 33.3825L31.0742 33.3787C31.1931 33.2645 31.3057 33.1564 31.4108 33.0563C33.8836 30.7002 34.3491 28.6691 32.7911 27.0339C32.0686 26.2756 30.6261 26.3305 29.418 26.4822C29.1837 26.5116 28.9416 26.534 28.6948 26.5568Z" />
            <path d="M14.5461 31.8182C14.5461 32.5588 14.1441 32.8685 13.6682 33.2351C13.5104 33.3567 13.3445 33.4845 13.1825 33.6363C12.6197 34.1637 10.892 34.5454 10.0773 34.5454C8.32069 34.5454 5.00028 32.2937 5.00028 30.4545C5.00028 29.8099 5.79225 29.2637 6.48108 28.7887C6.79452 28.5725 7.08661 28.3711 7.273 28.1818C7.67541 27.7731 8.88295 27.9388 9.86402 28.0735C10.279 28.1304 10.6535 28.1818 10.9094 28.1818C12.666 28.1818 14.5461 29.979 14.5461 31.8182Z" />
            <path d="M36.5215 22.3681C36.5987 22.3362 36.6761 22.3041 36.753 22.2727C38.456 21.5781 38.7898 19.0138 38.1264 17.3872C38.0298 17.1503 37.9359 16.7842 37.8319 16.3784C37.586 15.4192 37.2834 14.2385 36.753 14.0202C35.9675 13.6969 33.5962 14.1912 32.7277 14.5454C31.0247 15.2401 30.7031 17.9189 31.3666 19.5455C31.6742 20.2998 33.3904 22.4054 34.0912 22.7272C34.8331 23.068 35.6826 22.7159 36.5215 22.3681Z" />
            <path d="M5.48425 27.7968C5.43871 27.8024 5.39299 27.8083 5.34721 27.8142C4.85143 27.878 4.34964 27.9426 4.00379 27.6475C3.6771 27.3688 3.06521 25.9719 3.00933 25.5171C2.88884 24.5364 3.44247 23.1316 4.44729 23.0081C4.95976 22.9452 6.29139 23.0297 6.66295 23.3218C6.91382 23.519 6.90612 24.2043 6.89986 24.761C6.89722 24.9965 6.89483 25.209 6.91238 25.3518C7.03287 26.3325 6.48908 27.6734 5.48425 27.7968Z" />
            <path d="M21.7208 33.8131L21.7108 33.7717C21.6397 33.4676 20.9747 33.4003 20.4937 33.5128C20.4237 33.5292 20.3192 33.5446 20.2035 33.5618C19.9296 33.6023 19.5923 33.6523 19.4979 33.7456C19.3581 33.8838 19.3303 34.3058 19.3666 34.4608C19.4377 34.7649 20.1342 34.8304 20.6153 34.7179C20.8383 34.6658 21.519 34.3682 21.6527 34.245C21.7943 34.1146 21.7573 33.963 21.7208 33.8131Z" />
            <path d="M5.83083 21.0403C6.04548 21.4136 6.51019 22.2219 6.36336 22.4913C6.28622 22.6328 5.77576 22.5727 5.26733 22.5128C4.82295 22.4605 4.38012 22.4084 4.22956 22.4912C3.98291 22.627 3.69984 22.8727 3.42496 23.1113C2.92403 23.5461 2.45027 23.9573 2.27364 23.6363C2.13413 23.3828 1.67314 21.6572 1.8193 21.3636C1.95973 21.0816 3.29495 20.1877 3.63605 20C4.33218 19.6169 5.48476 20.4156 5.75831 20.9128C5.7761 20.9451 5.80122 20.9888 5.83083 21.0403Z" />
            <path d="M19.7844 36.0194L19.7867 35.9888C19.8042 35.7645 19.4102 35.5769 19.0928 35.5521C19.0466 35.5485 18.9796 35.5369 18.9053 35.5242C18.7293 35.4939 18.5123 35.4565 18.4357 35.5007C18.3222 35.566 18.2204 35.8504 18.2114 35.9648C18.1939 36.1891 18.6076 36.3821 18.925 36.407C19.0722 36.4185 19.5492 36.3584 19.6559 36.3021C19.7689 36.2424 19.7767 36.1302 19.7844 36.0194Z" />
            <path d="M15.5961 33.4468C15.6296 33.2701 15.6635 33.0914 15.8985 33.0257C16.1204 32.9637 17.081 32.996 17.3726 33.0545C18.0013 33.1805 18.7947 33.604 18.7231 33.961C18.6866 34.143 18.4372 34.5741 18.2003 34.6488C18.0404 34.6992 17.6147 34.5805 17.2688 34.4839C17.1225 34.4431 16.9904 34.4063 16.8988 34.3879C16.2701 34.2619 15.5151 33.8526 15.5867 33.4956C15.5899 33.4794 15.5931 33.463 15.5961 33.4468Z" />
          </g>
          <path
            d="M2.48441 15.349L4.59888 14.2917C4.85436 14.164 5.15227 14.1516 5.41748 14.2577L7.01918 14.8984C7.18551 14.9649 7.36666 14.9855 7.54369 14.9581L10.2619 14.5369C10.4184 14.5127 10.5669 14.4516 10.6952 14.3587L11.5413 13.7463C11.7211 13.6161 11.9391 13.5495 12.161 13.5569L14.3581 13.6301C14.4823 13.6342 14.6046 13.6615 14.7187 13.7104L17.4423 14.8777C17.6283 14.9573 17.834 14.9788 18.0324 14.9391L21.9368 14.1582C22.1549 14.1146 22.3812 14.1449 22.5801 14.2444L23.6005 14.7545C23.9063 14.9074 24.269 14.8935 24.5622 14.7176L26.009 13.8495C26.2364 13.713 26.5087 13.6725 26.766 13.7368L27.8235 14.0012C28.0551 14.0591 28.2997 14.0322 28.5132 13.9255L29.5533 13.4054C29.8349 13.2647 30.1662 13.2647 30.4478 13.4054L31.3715 13.8673C31.653 14.0081 31.9844 14.0081 32.2659 13.8673L34.1755 12.9125C34.4127 12.7939 34.6873 12.7744 34.9389 12.8583L37.004 13.5466C37.7656 15.5521 38.1825 17.7274 38.1825 20C38.1825 23.8914 37.0826 25.6791 35.0007 28.6364C34.6886 29.0797 34.3993 29.6008 34.1039 30.1327C33.57 31.0943 33.0165 32.0912 32.2734 32.7273C30.9167 33.8888 28.9323 35.1843 27.2734 35.9091C26.4233 36.2805 25.8042 36.7658 25.2198 37.2239C24.2732 37.9658 23.4177 38.6364 21.8189 38.6364C20.3379 38.6364 18.6993 37.7667 17.1864 36.9638C16.4123 36.553 15.6711 36.1596 15.0007 35.9091C14.1012 35.573 13.0618 35.3409 12.004 35.1048C9.86524 34.6273 7.65102 34.1329 6.36435 32.7273C5.67437 31.9735 5.23043 30.8685 4.80197 29.802C4.57255 29.231 4.34756 28.671 4.09162 28.1818C2.77465 25.665 2.27344 23.0375 2.27344 20V19.9479C2.27342 18.3715 2.27341 16.8422 2.40516 15.3844C2.43202 15.3738 2.45846 15.3619 2.48441 15.349Z"
            classname="border"
          />
        </svg>
        <svg classname="top" viewBox="0 0 40 40">
          <path
            d="M2.48354 15.349L4.59801 14.2917C4.8535 14.164 5.15141 14.1516
    5.41662 14.2577L7.01831 14.8984C7.18464 14.9649 7.3658 14.9855 7.54283
    14.9581L10.2611 14.5369C10.4175 14.5126 10.566 14.4516 10.6943
    14.3587L11.5404 13.7462C11.7203 13.6161 11.9383 13.5495 12.1601
    13.5569L14.3573 13.6301C14.4814 13.6342 14.6037 13.6615 14.7179
    13.7104L17.4415 14.8776C17.6274 14.9573 17.8331 14.9788 18.0315
    14.9391L21.936 14.1582C22.154 14.1146 22.3804 14.1449 22.5793
    14.2443L23.5996 14.7545C23.9054 14.9074 24.2681 14.8935 24.5613
    14.7176L26.0081 13.8495C26.2355 13.713 26.5079 13.6725 26.7652
    13.7368L27.8226 14.0012C28.0542 14.0591 28.2989 14.0322 28.5124
    13.9255L29.5525 13.4054C29.834 13.2647 30.1654 13.2647 30.4469
    13.4054L31.3706 13.8673C31.6522 14.0081 31.9835 14.0081 32.2651
    13.8673L34.1746 12.9125C34.4119 12.7939 34.6865 12.7744 34.9381
    12.8582L37.0031 13.5466C36.2194 11.4829 35.0709 9.59899 33.6362
    7.97352C32.9893 7.24059 31.9489 6.79692 30.9296 6.36223C30.2705
    6.08117 29.6202 5.80386 29.0908 5.45454C27.9994 4.73447 27.352 3.90444
    26.7655 3.15232C25.8101 1.92737 25.016 0.909088 22.7271
    0.909088C21.1576 0.909088 16.9072 1.89879 15.4544 2.27272C13.8709
    2.68028 12.4734 3.68793 11.1332 4.6543C10.7517 4.92932 10.375 5.20099
    9.99985 5.45454C9.44177 5.83176 8.78703 6.18085 8.11682
    6.53818C6.76861 7.25699 5.35781 8.00919 4.5453 9.09091C3.15215 10.9457
    2.61296 13.0755 2.4043 15.3844C2.43116 15.3737 2.4576 15.3619 2.48354
    15.349Z"
            classname="background"
          />
          <path
            d="M37.0054 13.5471L34.9387 12.8582C34.6871 12.7744 34.4125 12.7939 34.1753 12.9125L33.4863 13.257C33.2889 12.2066 32.9357 11.4763 32.6495 10.8845C32.3156 10.1943 32.0729 9.69248 32.2747 9.09091C32.3942 8.7345 32.4742 8.41811 32.5401 8.15761C32.7574 7.29872 32.821 7.04754 33.6383 7.97352C35.0731 9.59913 36.2217 11.4833 37.0054 13.5471Z"
            classname="shine"
          />
          <g classname="dark">
            <path d="M2.48422 15.349L4.59869 14.2917C4.85418 14.164 5.15209 14.1516 5.4173 14.2577L7.01899 14.8984C7.18532 14.9649 7.36648 14.9855 7.54351 14.9581L8.48536 14.8121C8.49861 14.7554 8.50876 14.697 8.51555 14.6368C8.72171 12.8092 7.93822 11.779 6.19264 11.5821C5.9267 11.5521 5.58188 11.4566 5.21388 11.3547C4.39836 11.1289 3.46902 10.8716 3.03201 11.2256C2.4282 11.7146 2.26383 13.2482 2.15971 14.2195C2.15 14.3101 2.14082 14.3958 2.13185 14.4753C2.09176 14.8307 2.08909 15.1559 2.12364 15.4508C2.24892 15.4399 2.37129 15.4054 2.48422 15.349Z" />
            <path d="M11.595 5.60576C11.6111 5.66603 11.6272 5.72623 11.6426 5.78632C11.982 7.11198 15.1873 7.27255 17.5074 6.67849C17.8453 6.59196 18.3494 6.50236 18.908 6.40306C20.2286 6.16832 21.8541 5.87939 22.3102 5.44876C22.9857 4.81094 23.1244 2.94564 22.9513 2.26955C22.6118 0.943882 19.2545 0.797761 16.9344 1.39182C15.8584 1.66731 12.5739 3.11801 11.928 3.68839C11.2442 4.29222 11.4207 4.95293 11.595 5.60576Z" />
          </g>
          <path
            d="M37.0031 13.5466C36.2194 11.4829 35.0709 9.59899 33.6362 7.97352C32.9893 7.24059 31.9489 6.79692 30.9296 6.36223C30.2705 6.08117 29.6202 5.80386 29.0908 5.45454C27.9994 4.73447 27.352 3.90444 26.7655 3.15232C25.8101 1.92737 25.016 0.909088 22.7271 0.909088C21.1576 0.909088 16.9072 1.89879 15.4544 2.27272C13.8709 2.68028 12.4734 3.68793 11.1332 4.6543C10.7517 4.92932 10.375 5.20099 9.99985 5.45454C9.44177 5.83176 8.78703 6.18085 8.11682 6.53818C6.76861 7.25699 5.35781 8.00919 4.5453 9.09091C3.15215 10.9457 2.61296 13.0755 2.4043 15.3844"
            classname="border"
          />
          <path
            d="M2.27344 15.4573L4.59905 14.2944C4.85454 14.1667 5.15245 14.1543 5.41766 14.2604L7.01934 14.9011C7.18568 14.9676 7.36684 14.9882 7.54388 14.9608L10.262 14.5396C10.4184 14.5153 10.5669 14.4543 10.6951 14.3615L11.5415 13.7489C11.7213 13.6188 11.9393 13.5522 12.1611 13.5596L14.3583 13.6328C14.4825 13.6369 14.6048 13.6642 14.7189 13.7131L17.4425 14.8804C17.6284 14.96 17.8342 14.9815 18.0325 14.9418L21.937 14.1609C22.1551 14.1173 22.3814 14.1476 22.5803 14.2471L23.6006 14.7572C23.9064 14.9101 24.2692 14.8962 24.5623 14.7203L26.0092 13.8522C26.2366 13.7157 26.5089 13.6752 26.7662 13.7395L27.8237 14.0039C28.0552 14.0618 28.2999 14.0349 28.5134 13.9282L29.5535 13.4081C29.835 13.2674 30.1664 13.2674 30.4479 13.4081L31.3717 13.87C31.6532 14.0108 31.9846 14.0108 32.2661 13.87L34.1757 12.9152C34.4129 12.7966 34.6875 12.7771 34.9391 12.861L37.2734 13.6391"
            classname="crack"
          />
        </svg>
        <div classname="eye left">
          <svg viewBox="0 0 10 10">
            <path d="M8.99929 4.99965C8.99929 7.20859 7.20859 8.99929 4.99964 8.99929C2.7907 8.99929 1 7.20859 1 4.99965C1 2.7907 2.7907 1 4.99964 1C7.20859 1 8.99929 2.7907 8.99929 4.99965Z" />
          </svg>
        </div>
        <div classname="eye right">
          <svg viewBox="0 0 10 10">
            <path d="M8.99929 4.99965C8.99929 7.20859 7.20859 8.99929 4.99964 8.99929C2.7907 8.99929 1 7.20859 1 4.99965C1 2.7907 2.7907 1 4.99964 1C7.20859 1 8.99929 2.7907 8.99929 4.99965Z" />
          </svg>
        </div>
        <svg classname="mouth" viewBox="0 0 12 9">
          <path d="M6 8.5C3.4154 8.5 1.5 5.5 1.5 5.5H10.5C10.5 5.5 8.5846 8.5 6 8.5Z" />
        </svg>
      </div>
      <div classname="content">
        <div>
          We use cookies to personalize your site
          <br />
          experience and analyze the site traffic.
        </div>
        <div classname="list">
          <button classname="muted">Decline</button>
          <button>Accept</button>
        </div>
      </div>
    </div>
  );
}
