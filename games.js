//Improvements :-
/*
    1. Add score tag in program, Code for collison with enemy. score--
    2. Improve the collison borders
    3. Improve graphics
    4. Add different avatars to play with
*/
function assets_loader()
{
    //enemy image
    enemy_image = new Image;
    enemy_image.src = "Assets/enemy.png";

    //player image
    player_avatar = new Image;
    player_avatar.src = "Assets/hero.png";

    //bonus image
    bonus_image = new Image;
    bonus_image.src = "Assets/bonus2.png";

}

function init()
{
    //define objects that we have in the game

    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 700;
    H = 400;

    canvas.width = W;
    canvas.height = H;

    //create context
    pen = canvas.getContext('2d');
    console.log(pen);

    game_over = false;
    // box = {
    //     x : 50,
    //     y : 50,
    //     w : 60,
    //     h : 60,
    //     speed : 10
    // };
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20
    };

    e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 30
    };

    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 40
    };

    enemy = [e1, e2, e3];

    player = {
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20,
        moving : false
    };

    bonus = {       //since bonus is static object, we didn't given it any speed
        x : W-100,
        y : H/2,
        w : 60,
        h : 60,
    };

    //listen to event on canvas
    canvas.addEventListener("mousedown", ()=>{
        player.moving = true;
    });

    canvas.addEventListener("mouseup", ()=>{
        player.moving = false;
    })
}

function collison_checker(rect1, rect2)
{
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y)
    {
         // collision detected!
         return true;
    }

    return false;
}
function draw()
{
    //clear the canvas area for the old frame
    pen.clearRect(0, 0, W, H);

    // pen.fillRect(box.x, box.y, box.w, box.h);
    // pen.fillStyle = "red";

    pen.drawImage(player_avatar, player.x, player.y, player.w, player.h);
    pen.drawImage(bonus_image, bonus.x, bonus.y, bonus.w, bonus.h);

    for(let i=0; i<enemy.length; i++)
    {
        pen.drawImage(enemy_image ,enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    
    
}

function update()
{
    //player movement
    if(player.moving == true)
    {
        player.x += player.speed;
    }

    //collison checking
    if(collison_checker(player, bonus))
    {
        // console.log("you won");
        alert("!! You Won !!");
        game_over = true;
        return;
    }

    //enemy movement
    for(let i=0; i<enemy.length; i++)
    {
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y<=0 || enemy[i].y >= H-enemy[i].h)
        {
            enemy[i].speed *= -1;
        }
    }
    
}

function gameloop()
{
    if(game_over == true)
    {
        clearInterval(f);
    }
    draw();
    update();
    console.log("action");
}

assets_loader();
init();
var f = setInterval(gameloop, 100);