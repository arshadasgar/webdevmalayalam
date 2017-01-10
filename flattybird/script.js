$(function() {

    //saving dom objects to variables
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score_span = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    //saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.height());
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());

    //Some other variable declarations
    var the_game;
    var anim_id;
    var pole_current_position;
    var pole_new_position;
    var speed = 5;
    var pole_new_height;
    var bird_current_position;
    var bird_go_up = false;
    var score = 0;
    var score_updated = false;
    var game_over = false;

    //Game code
    the_game = function() {
        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
            stop_the_game();
        } else {
            //Move the bird down
            if (bird_go_up === false) {
                move_bird_down();
            }
            //Move the poles
            pole_current_position = parseInt(pole.css('right'));
            if (pole_current_position > container_width - bird_left && score_updated === false) {
                score = score + 1;
                score_span.text(score);
                score_updated = true;
            }
            if (pole_current_position > container_width) {
                //Change the poles height before it re-appear
                pole_new_height = parseInt(Math.random() * 100);
                pole_1.css('height', pole_initial_height + pole_new_height);
                pole_2.css('height', pole_initial_height - pole_new_height);
                //Change the poles speed before it re-appear
                speed = speed + 1;
                speed_span.text(speed);
                pole_current_position = pole_initial_position;
                score_updated = false;
            }
            pole_new_position = pole_current_position + speed;
            pole.css('right', pole_new_position);


            anim_id = requestAnimationFrame(the_game);
        }
    };

    anim_id = requestAnimationFrame(the_game);

    //Other functions
    function move_bird_down() {
        bird_current_position = parseInt(bird.css('top'));
        bird.css('top', bird_current_position + 3);
    }

    function move_bird_up() {
        bird_current_position = parseInt(bird.css('top'));
        bird.css('top', bird_current_position - 5);
        bird_go_up = requestAnimationFrame(move_bird_up);
    }

    $(document).on('keydown', function(e) {
        var key = e.keyCode;
        if (key === 32 && bird_go_up === false && game_over === false) {
            bird_go_up = requestAnimationFrame(move_bird_up);
        }
    });

    $(document).on('keyup', function(e) {
        var key = e.keyCode;
        if (key === 32) {
            cancelAnimationFrame(bird_go_up);
            bird_go_up = false;
        }
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        restart_btn.slideDown();
    }

    restart_btn.click(function() {
        location.reload();
    });


});
