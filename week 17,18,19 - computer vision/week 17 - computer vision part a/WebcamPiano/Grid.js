class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 40;
    this.notePos = [];
    this.noteState = [];
    this.audioEnabled = false;
    this.userAudioOn = false;
    this.notes = ['C', 'Db', 'D', 'Eb', 'D', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    this.synth;
    this.volume;

    // initalise grid structure and state
    for (var x = 0; x < _w; x += this.noteSize) {
      var posColumn = [];
      var stateColumn = [];
      for (var y = 0; y < _h; y += this.noteSize) {
        posColumn.push(createVector(x + this.noteSize / 2, y + this.noteSize / 2));
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img, vol) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
    //start of my code
    this.volume = vol * 0.01;
    //end of my code
  }
  /////////////////////////////////
  drawActiveNotes(img) {
    // draw active notes
    fill(255);
    noStroke();
    //start of my code
    this.synth = new p5.MonoSynth();
    //end of my code

    for (var i = 0; i < this.notePos.length; i++) {
      for (var j = 0; j < this.notePos[i].length; j++) {
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j] > 0) {
          var alpha = this.noteState[i][j] * 200;
          var c1 = color(0, 0, 255, alpha);
          var c2 = color(255, 255, 0, alpha);
          var mix = lerpColor(c1, c2, map(i + //start of my code
            sin(frameCount), -1,//end of my code
            this.notePos.length, 0, 1));
          fill(mix);
          var s = this.noteState[i][j];
          //start of my code
          push();

          translate(x, y);

          if (random(0, 100) > 97) {
            this.drawSparks();
          }

          rotate(map(sin(frameCount), -1, 1, 0, 360));

          rect(0, 0, this.noteSize * s, this.noteSize * s);

          pop();

          if (this.audioEnabled) {
            let octave = round(map(y, 0, this.gridHeight, 0, 11));
            let noteIndex = round(map(x, 0, this.gridWidth, 0, this.notes.length - 1))
            this.playSynth(noteIndex, octave);
          }
          //end of my code
        }
        this.noteState[i][j] -= 0.05;
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
      }
    }
  }
  /////////////////////////////////
  findActiveNotes(img) {
    for (var x = 0; x < img.width; x += 1) {
      for (var y = 0; y < img.height; y += 1) {
        var index = (x + (y * img.width)) * 4;
        var state = img.pixels[index + 0];
        if (state == 0) { // if pixel is black (ie there is movement)
          // find which note to activate
          var screenX = map(x, 0, img.width, 0, this.gridWidth);
          var screenY = map(y, 0, img.height, 0, this.gridHeight);
          var i = int(screenX / this.noteSize);
          var j = int(screenY / this.noteSize);
          this.noteState[i][j] = 1;
        }
      }
    }
  }
  //start of my code

  drawSparks() {
    let sparkCount = random(3, 12);
    for (let i = 0; i < sparkCount; i++) {
      push();
      rotate(map(random(i, i + 50), 0, sparkCount, 0, 360));
      fill(255, 255, 0);
      let sparkX = map(sin(frameCount + i), -1, 1, 0, 40);
      let sparkY = map(sin(frameCount + i), -1, 1, 0, 50);
      let sparkH = map(sin(frameCount + i), -1, 1, 15, 0);
      let sparkW = sparkH / 4;
      rect(sparkX, sparkY, sparkW, sparkH);
      pop();
    }

  }

  toggleAudio() {
    if (this.audioEnabled) {
      outputVolume(0);
      this.audioEnabled = false;
    }
    else {
      if (!this.userAudioOn) {
        userStartAudio();
        this.userAudioOn = true;
      }
      outputVolume(this.volume);
      this.audioEnabled = true;
    }
  }

  playSynth(indexNote, indexOctave) {
    outputVolume(this.volume);
    let noteOct = this.genNote(this.notes[indexNote], indexOctave);
    this.synth.play(noteOct, 0, 0.001);
  }


  genNote(note, octave) {
    return note + octave.toString();
  }
  //end of my code
}
