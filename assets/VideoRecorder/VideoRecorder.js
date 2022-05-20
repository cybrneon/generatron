// class VideoRecorder
//
// p5.js helper to record a video from the frames produced by a sketch
//
// Pierre Rossel / HEAD-Genève
//
// 2019-09-19  Initial version
// 2022-03-23  Cosmetics

// CYBRNEON
// 2022-05-18  Added stuff to style the REC Button

class VideoRecorder {
  static record() {
    print("Recording...");

    this.chunks = [];
    let stream = document.querySelector("canvas").captureStream();
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = (e) => {
      if (e.data.size) {
        this.chunks.push(e.data);
      }
    };
    this.recorder.onstop = () => this.exportVideo();

    if (this.btn) {
      this.btn.onclick = () => this.stop();
      this.btn.textContent = "Stop recording";
    }
    if (this.lnkDownload) this.lnkDownload.remove();

    this.recorder.start();
  }

  static stop() {
    print("Stop Recording.");
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
      if (this.btn) {
        this.btn.textContent = "Record Video";
        this.btn.onclick = () => this.record();
      }
    }
  }

  static addButton() {
    this.btn = document.createElement("button");
    this.btn.innerHTML = "Record Video";
    //this.btn.style.margin = "10px"; --- not needed
    this.btn.onclick = () => this.record();
    document.body.append(this.btn);

  }

  static exportVideo(e) {
    var blob = new Blob(this.chunks, {
      type: "video",
    });
    var url = URL.createObjectURL(blob);

    // Show video
    var vid = document.createElement("video");
    vid.id = "recorded";
    vid.controls = true;
    vid.src = url;
    vid.download = "filename.mp4";
    document.body.appendChild(vid);
    vid.play();
    vid.style.maxWidth = "100%";

    // Download link
    let date =
      year() +
      "_" +
      ("0" + month()).slice(-2) +
      "_" +
      ("0" + day()).slice(-2) +
      "_" +
      ("0" + hour()).slice(-2) +
      "_" +
      ("0" + minute()).slice(-2) +
      "_" +
      ("0" + second()).slice(-2);
    this.lnkDownload = document.createElement("a");
    this.lnkDownload.innerHTML = "Download Video<br>";
    this.lnkDownload.href = url;
    this.lnkDownload.download = "video_" + date + ".mp4";

    if (this.btn) {
      this.btn.parentNode.insertBefore(this.lnkDownload, this.btn.nextSibling);
    } else {
      document.body.append(this.lnkDownload);
    }

    // Auto download video when ready
    // this.lnkDownload.click();
  }
}
