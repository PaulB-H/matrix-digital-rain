"use strict";

let drawInterv;

const digitalrain = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const drops = [];
  const text = [];
  const font_size = 20;

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let columns = canvas.width / font_size;

  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  // Half-width kana characters, Latin Numbers and Alphabets, in decreasing probability.

  // Explain decreasing probability:
  // There are 3 sets of  55 Japanese characters, 4 sets of numbers 1-9, and one set of A-Z
  // Because of this, when picking at random from the array you are much more likely
  // to get a Kana character over anything else
  const chars =
    "｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ｢｣ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ123456789123456789123456789123456789123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
      ""
    );

  // Set the initial Y position for every drop to be
  // staggered off of the top of the page
  for (let i = 0; i < columns; i++) drops[i] = Math.random() * 50 - 50;

  const draw = () => {
    // Set font style
    ctx.font = font_size + "px 'Fira Code', 'monospace'";

    // Set fill style to be just semi-transparent black
    ctx.fillStyle = "rgba(0, 0, 0, 0.050)";
    // Stamp the entire canvas with the semi-transparent layer
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Set the previous line to green so that the trail would remain green.
    ctx.fillStyle = "#6D2";
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(text[i], i * font_size, drops[i] * font_size);
    }

    // Generate new characters and display them, in white.
    for (let i = 0; i < drops.length; i++) {
      drops[i]++;
      // Random character to print.
      text[i] = chars[Math.floor(Math.random() * chars.length)];

      ctx.fillStyle = "#000";
      // stamp a small semi-transparent square on space new character will go
      ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);

      ctx.fillStyle = "#FFF";
      // Parameters - text, x-pos, y-pos.
      ctx.fillText(text[i], i * font_size, drops[i] * font_size);

      // Sending the drop to the top randomly, after it has crossed the screen.
      if (drops[i] * font_size > canvas.height)
        drops[i] = Math.random() * 100 - 100;
    }
  };

  drawInterv = setInterval(draw, 50);
};

digitalrain();

window.addEventListener("resize", () => {
  window.clearInterval(drawInterv);
  digitalrain();
});
