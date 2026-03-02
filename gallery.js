var gallery = document.querySelector('#gallery');

if (gallery) {
    var getVal = function (elem, style) {
        return parseInt(window.getComputedStyle(elem).getPropertyValue(style), 10);
    };

    var getHeight = function (item) {
        return item.querySelector('.content').getBoundingClientRect().height;
    };

    var resizeAll = function () {
        var rowSize = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');

        gallery.querySelectorAll('.gallery-item').forEach(function (item) {
            var height = getHeight(item);
            item.style.gridRowEnd =
                'span ' + Math.ceil((height + gap) / (rowSize + gap));
        });
    };

    var handleImageLoaded = function (img) {
        var rowSize = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        var gitem = img.parentElement.parentElement;

        gitem.style.gridRowEnd =
            'span ' + Math.ceil((getHeight(gitem) + gap) / (rowSize + gap));
        img.classList.remove('byebye');
    };

    gallery.querySelectorAll('img').forEach(function (img) {
        img.classList.add('byebye');

        if (img.complete) {
            handleImageLoaded(img);
        } else {
            img.addEventListener('load', function () {
                handleImageLoaded(img);
            });
        }
    });

    window.addEventListener('resize', resizeAll);
    window.addEventListener('load', resizeAll);

    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            item.classList.toggle('full');
        });
    });
}
