export class ImageViewer {
    constructor(max_dir_id, max_img_id, img_dir, zoom_factor = 2, extention = 'jpg'){
        this.max_dir_id = max_dir_id;
        this.max_img_id = max_img_id;
        this.img_dir = img_dir
        this.dir_id = 1;
        this.img_id = 1;
        this.Img = document.querySelector('#main_img img');
        this.dir_label = document.getElementById("dir_label");
        this.img_label = document.getElementById("img_label");
        this.extention = "." + extention
        this.img_label_list = ['method A', 'method B', 'Original'];
        this.color_list = ['#e2120b', '#008000', '#666666', '#3e68f1'];
        
        // Driftの定義
        this.paneList = document.querySelectorAll('.detail');
        for (let i=0; i<max_img_id; i++) {
            console.log(i);
            new Drift(this.Img, {
                paneContainer: this.paneList[i],
                zoomFactor: zoom_factor,
                inlinePane: false,
                sourceAttribute: `data-zoom-${ i+1 }`,
                inlineOffsetY: 0,
                containInline: true,
                hoverBoundingBox: true,
            });
        }

        // キーを押した際に画像が切り替わるように設定
        document.addEventListener('keydown', function(event) {
            for (let i=0; i<max_img_id; i++) {
                if (event.code == `Digit${ i+1 }`) {
                    this.specify_img_id(i+1);
                }
            }
            if (event.code === 'KeyN'){
                this.next_dir();
            }else if (event.code === 'KeyP'){
                this.prev_dir();
            }
        }.bind(this));

        // クリックした際に画像が切り替わるように設定
        this.Img.addEventListener('click', function() {
                this.next_image()
        }.bind(this));
        this.Img.oncontextmenu = function () {
                this.prev_image();
                return false;
        }.bind(this);

        window.addEventListener('resize', function(event) {
            this.set_max_height();
        }.bind(this));

    }
    show_image() {
        let imgPath = this.img_dir+"/"+"img"+this.dir_id+"/"+this.img_id+this.extention;
        console.log(imgPath);
        this.Img.src = imgPath;
        for (let i=0; i<this.max_img_id; i++) {
            let largePath = this.img_dir+"img"+this.dir_id+"_large/"+(i+1)+this.extention;
            this.Img.setAttribute(`data-zoom-${ i+1 }`, largePath);
        }
        this.set_max_height();
        this.set_label();
    }
    set_max_height() {
        let window_height = window.innerHeight
        let window_width = window.innerWidth
        let aspect = this.Img.naturalHeight / this.Img.naturalWidth
        this.Img.style.maxHeight = Math.min(0.6 * window_height, 0.95 * window_width * aspect) + 'px';
        window.getComputedStyle(this.Img);
    }
    set_label() {
        this.dir_label.textContent = "image "+this.dir_id+" / "+this.max_dir_id;
        this.img_label.textContent = this.img_label_list[this.img_id-1];
        this.img_label.style.backgroundColor = this.color_list[this.img_id-1];
    }
    next_dir() {
        if (this.dir_id === this.max_dir_id){
            return ;
        }
        this.dir_id++;
        this.img_id = 1;
        this.show_image();
    }
    prev_dir() {
        if (this.dir_id === 1){
            return ;
        }
        this.dir_id--;
        this.img_id = 1;
        this.show_image();
    }
    next_image() {
        if (this.img_id === this.max_img_id){
            this.img_id = 1;
        }
        else {
            this.img_id++;
        }
        this.show_image();
    }
    prev_image() {
        if (this.img_id === 1){
            this.img_id = this.max_img_id;
        }
        else {
            this.img_id--;
        }
        this.show_image();
    }
    specify_img_id(img_id) {
        this.img_id = img_id;
        this.show_image();
    }
}