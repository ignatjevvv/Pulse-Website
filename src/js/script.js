$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
              },
              {
                breakpoint: 768,
                settings: {
                  arrows: false,
                  infinite: true,
                  autoplay: true,
                  dots: true,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  arrows: false,
                  infinite: true,
                  autoplay: true,
                  dots: false,
                }
              },
              {
                breakpoint: 425,
                settings: {
                  arrows: false,
                  infinite: true,
                  autoplay: true,
                  dots: false,
                }
              }

        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                 e.preventDefault();
                 $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                 $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active ');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal window

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
      $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      })
    })

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты name@domain.com"
          }
        }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Smooth scroll page up

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }

    });
    
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

  });