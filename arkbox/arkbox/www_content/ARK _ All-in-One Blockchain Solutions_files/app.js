$(document).ready(function () {

    var $menuBtn = $(".menu__btn");
    var $menuNav = $(".menu__wrapper");

    $menuBtn.click(function () {
        $menuNav.slideToggle("fast");
    });
    
    var $dropdownTrigger = $(".menu__item--trigger");
    $dropdownTrigger.each(function() {
        $(this).find('.menu__link--trigger').click(function(e) {
            e.preventDefault();
        });
    });
    $dropdownTrigger.hover(function (e) {
        e.stopPropagation();
        var $this = $(this);
        var $link = $this.find(".menu__link--trigger");
        $link.toggleClass("menu__link--trigger-active");
        var $dropdown = $this.find(".menu__list--inner");
        $dropdown.slideDown("fast");
    }, function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $link = $this.find(".menu__link--trigger");
        $link.toggleClass("menu__link--trigger-active");
        var $dropdown = $this.find(".menu__list--inner");
        $dropdown.slideUp("fast");
    });

    var $langBtn = $(".menu__lang");
    var $langList = $(".menu__lang-list");
    var $langActive = $(".menu__lang");
    var $langItem = $(".menu__lang-item");

    $langBtn.hover(function () {
        $langList.addClass("menu__lang-list--active");
        if ($(window).width() < 768) {
            $menuNav.slideUp("fast");
        }
    }, function () {
        $langList.removeClass("menu__lang-list--active");
    });

    $langItem.click(function () {
        var $this = $(this);
        var label = $this.children("span").text();
        var flag = $this.children("img").attr("src");
        $langActive.children("span").text(label);
        $langActive.children("img").attr("src", flag);
    });

    var $btnShare = $(".menu__social");
    var btnSharePath = $btnShare.find(".menu__social-btn").attr("src");
    var $shareList = $(".menu__social-list");
    var isBtnShare = false;

    $btnShare.hover(function () {
        var $this = $(this).find(".menu__social-btn");
        $shareList.addClass("menu__social-list--active");
        if (!isBtnShare) {
            $this.attr("src", $this.attr("data-close"));
            isBtnShare = true;
        } else {
            $this.attr("src", btnSharePath);
            isBtnShare = false;
        }
        if ($(window).width() < 768) {
            $menuNav.slideUp("fast");
        }
    }, function () {
        var $this = $(this).find(".menu__social-btn");
        $shareList.removeClass("menu__social-list--active");
        if (!isBtnShare) {
            $this.attr("src", $this.attr("data-close"));
            isBtnShare = true;
        } else {
            $this.attr("src", btnSharePath);
            isBtnShare = false;
        }
    });

    if ($(".cmc")) {
        var $cmcControl = $(".cmc__chart-control");
        $cmcControl.click(function () {
            $cmcControl.removeClass("cmc__chart-control--active");
            $(this).addClass("cmc__chart-control--active");
        });
    }

    if ($(".banner")) {
        var $bannerArrow = $(".banner__arrow");
        $bannerArrow.click(function () {
            var navbarHeight = ($('header.menu').height() * 2) + 10;
            $.scrollTo($(".content").offset().top - navbarHeight, 500);
        });
    }


    // DEVICE TAB NAGIGATION

    $('.device__navigation ul.tabs li').click(function () {
        if ($(this).hasClass('tab-disabled')) {
            return;
        }

        var tab_id = $(this).attr('data-tab');

        $('.device__navigation ul.tabs li').removeClass('active');
        $('.deviceBottom__content').removeClass('current');

        $(this).addClass('active');
        $("#" + tab_id).addClass('current');
    })

    // ECOSYSTEM NAVIGATION
    var ecoSlider = $(".ecosystem__slider");

    function slickify() {
        ecoSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            slickSetOption: true,
            arrows: true,
            prevArrow: "<i class='fa fa-angle-left ecosystem__slider-arrow ecosystem__slider-arrow--prev'></i>",
            nextArrow: "<i class='fa fa-angle-right ecosystem__slider-arrow ecosystem__slider-arrow--next'></i>",
            dots: false,
            appendDots: $(".ecosystem__header"),
            dotsClass: "ecosystem__dots",
            responsive: [
                {
                    breakpoint: 992,
                    settings: "unslick"
            }
        ]
        });
    }
    slickify();
    $('.ecosystem__slider').on('afterChange', function (slick, currentSlide) {
        $(".ecosystem__navigation li").removeClass("active");
        $(".ecosystem__navigation li").eq(currentSlide.currentSlide).addClass("active");
    });

    $('.ecosystem__navigation li').click(function () {
        var pos = $(".ecosystem__navigation li").index(this);
        ecoSlider.slick('slickGoTo', [pos]);
        $(".ecosystem__navigation li").removeClass("active");
        $(this).addClass("active");
    });

    // ## Slick Navigation -> Delete and activate class="active" on index with clicking on arrows

    $(".ecosystem__slider-arrow").on("click", function () {
        var sliderIndex = ecoSlider.slick('slickCurrentSlide');
        $(".ecosystem__navigation li").removeClass("active");
        $(".ecosystem__navigation li").eq(sliderIndex).addClass("active");
    });

    $(window).resize(function () {
        var windowWidth = $(window).width();
        if (windowWidth > 992) {
            slickify();
        }
    });

    var $ecosystemBtn = $(".ecosystem__btn");
    var $ecosystemItems = $(".ecosystem__item");

    $ecosystemBtn.click(function () {
        $(this).hide();
        $ecosystemItems.removeClass("ecosystem__item--hidden");
    });

    if ($("input")) {
        $("input").keyup(function () {
            var $this = $(this);
            if ($this.val()) {
                $this.addClass("input--active");
            } else {
                $this.removeClass("input--active");
            }
        });
    }

    $(".menu").sticky({
        topSpacing: 0,
        zIndex: 999,
        center: true
    });

    var $playBtn = $(".welcome__play-icon, .welcome__play-label");
    var $overlay = $(".overlay");
    var $modal = $(".modal");
    var $modalVideo = $(".modal__video");

    $playBtn.click(function () {
        $overlay.addClass("overlay--active");
        $modal.addClass("modal--active");
    });

    $overlay.click(function () {
        $modal.removeClass("modal--active");
        $(this).removeClass("overlay--active");
    });

    $modal.click(function () {
        $(this).removeClass("modal--active");
        $overlay.removeClass("overlay--active");
        $modalVideo.each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
        });
    });

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            $modal.removeClass("modal--active");
            $overlay.removeClass("overlay--active");
            $modalVideo.each(function () {
                this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
            });
        }
    };

    var $upBtn = $(".up");

    $upBtn.click(function () {
        $.scrollTo(0, 250);
    });

    var $hotspot = $(".process__message-hotspot");
    var $message = $(".process__message-copy");

    $hotspot.hover(function () {
        var $this = $(this);
        var $copy = $this.siblings();
        $copy.css('display', 'block');
        $copy.addClass("process__message-copy--active");
    }, function () {
        var $this = $(this);
        var $copy = $this.siblings();
        $copy.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
            $copy.css('display', 'none');
        });
        $copy.removeClass("process__message-copy--active");
    });

    var $slack = $(".slack");
    var $slackClose = $(".slack__close");

    $slackClose.click(function () {
        $slack.slideUp("fast");
    });

    if ($(".roadmap").length > 0) {
        function createProgress(color, fill) {
            $(".roadmap__item-progress--" + color).each(function () {
                var $this = $(this);
                var percentage = $this.attr("data-progress");
                var width = $(".roadmap__item-progress-wrapper").width();
                $this.circleProgress({
                    value: percentage,
                    size: width,
                    startAngle: 1.5 * Math.PI,
                    lineCap: "round",
                    fill: fill,
                    emptyFill: "rgba(227, 227, 242, 1)"
                })
            });
        }
        $(window).resize(function () {
            var width = $(".roadmap__item-progress-wrapper").width();
            $(".roadmap__item-progress").circleProgress({
                size: width
            });
        });
        createProgress("blue", "#1e56ec");
        createProgress("black", "#3f475d");
        createProgress("green", "#89bdd3");
        createProgress("red", "#e62739");
    }
    
    var $menuTrigger = $(".footer__menu-link--trigger");
    $menuTrigger.click(function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass("footer__menu-link--trigger-active");
        var $submenu = $this.siblings(".footer__menu--inner");
        $submenu.slideToggle("fast");
    });
    
    if ($(".cmc").length > 0) {
        $(".cmc__slider").slick({
            mobileFirst: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: true,
            prevArrow: "<i class='fa fa-angle-left cmc__slider-arrow cmc__slider-arrow--prev'></i>",
            nextArrow: "<i class='fa fa-angle-right cmc__slider-arrow cmc__slider-arrow--next'></i>",
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 3
                    }
                }
            ]
        });
    }
    
    if ($(".popup").length > 0) {
        $(".popup__close").click(function () {
            $(".popup").removeClass("popup--active");
        });
        $(".popup__open").click(function () {
            var target = $(this).attr("data-popup");
            var thisPopup = $(".popup[data-popup='" + target + "']").addClass("popup--active");
        });
    }
    
    if ($(".resource").length > 0) {
        $(".resource--active .resource__content").slideDown(0);
        var $resourceTrigger = $(".resource__trigger");
        $resourceTrigger.click(function () {
            var $this = $(this);
            var $parent = $(this).parent();
            $parent.toggleClass("resource--active");
            var $content = $this.siblings();
            $content.slideToggle("fast");
        });
    }

    // Developers page - GitHub integration
    var repoList = $('.repo-list');
    if (repoList) {
        var githubData = [];
        var getData = function(type, repoObj, successCallback, pageNumber) {
            if (pageNumber === undefined) {
                pageNumber = 1;
            }
            var repoName = repoObj.data('repo');
            var url = 'https://api.github.com/repos/' + repoObj.data('owner') + 
                      '/' + repoName + '/' + type;
            if (type === 'repos') {
                if (!repoName) {
                    repoName = '-';
                }
                url = 'https://api.github.com/users/' + repoObj.data('owner') + '/repos';
            }
            $.ajax({
                url: url,
                data: {
                    since: '2000-01-01T00:00:00Z',
                    per_page: 100,
                    page: pageNumber,
                },
                beforeSend: function(xhr){
                    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
                    xhr.setRequestHeader('Authorization', 'token 8600e74335c6eca86c30da715d4fdbd19b0160ac');
                },
            }).done(function(response, textStatus, request) {
                if (typeof githubData[repoName] === 'undefined') {
                    githubData[repoName] = [];
                }
                if (typeof githubData[repoName][type] === 'undefined') {
                    githubData[repoName][type] = [];
                }
                githubData[repoName][type] = githubData[repoName][type].concat(response);
                var linkData = request.getResponseHeader('link');
                if (linkData !== null && typeof response === 'object' && response.length) {
                    getData(type, repoObj, successCallback, pageNumber + 1);
                } else {
                    successCallback();
                }
            });
        }
        $('.repo[data-repo]', repoList).each(function() {
            var thisRepo = $(this);
            var repoName = thisRepo.data('repo');
            getData('commits', thisRepo, function() {
                $('.repo-commits', thisRepo).text(githubData[repoName]['commits'].length);
                getData('pulls', thisRepo, function() {
                    getData('issues', thisRepo, function() {
                        var quantity = githubData[repoName]['issues'].length - githubData[repoName]['pulls'].length;
                        $('.repo-issues', thisRepo).text(quantity);
                    });
                });
            });
        });
        var repoMain = $('.repo-main[data-owner]');
        getData('repos', repoMain, function() {
            $('.repo-repositories', repoMain).text(githubData['-']['repos'].length);
        });
    }

    var contactForm = $('#contact-us-form');
    $('.btn-contact-submit', contactForm).click(function(e) {
        var noticeText = $('div.form-notice', contactForm);
        noticeText.addClass('hidden');
        var hasError = false;
        $(':input[required]:visible', contactForm).each(function() {
            if (/^\s*$/.test($(this).val())) {
                noticeText.text('One or more required fields are invalid.')
                          .addClass('alert-danger')
                          .removeClass('alert-success hidden');
                hasError = true;

                return false;
            }
        });

        if (hasError) {
            return false;
        }

        var botCheckValue = $('input[name="gotcha"]', contactForm).val();
        var name = $('input[name="name"]', contactForm).val();
        var subject = $('input[name="subject"]', contactForm).val();
        var email = $('input[name="email"]', contactForm).val();
        var message = $('input[name="message"]', contactForm).val();
        var emailMessage = 'Name: ' + name + '\n' +
                           'Subject: ' + subject + '\n' +
                           'Email: ' + email + '\n' +
                           'Message: ' + message;

        $.ajax({
            url: 'https://formspree.io/info@ark.io',
            method: "POST",
            data: {
                _subject: 'Website Contact Form submission',
                _gotcha: botCheckValue,
                _format: 'plain',
                _replyto: email,
                message: emailMessage,
            },
            dataType: "json",
        }).done(function(response) {
            noticeText.text('Thank you for contacting us. We will be in touch!')
                      .addClass('alert-success')
                      .removeClass('alert-danger hidden');
        }).fail(function(response) {
            noticeText.text('There was a problem submitting your request.')
                      .addClass('alert-danger')
                      .removeClass('alert-success hidden');
        });
    });

});
