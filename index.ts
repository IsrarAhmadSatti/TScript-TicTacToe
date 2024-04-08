#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.yellowBright("\tWelcome to TIC TAC TOE Game"))
console.log(chalk.yellowBright("\tYou are playing against Computer"))
console.log(chalk.yellowBright("\tSelect number 1 to 9 to enter your move"))

const board: any[][] = [];
for (let i = 0; i < 3; i++) {
    const row: any[] = [];
    for (let j = 0; j < 3; j++) {
        row.push(" ");
    }
    board.push(row);
}

async function display_board(board: any[][])
{
    console.log("+-------+-------+-------+")
    for (var i = 0; i < 3; i++)
    {
        for (var j = 0; j < 3; j++)
        {
            process.stdout.write(`| ${board[i][j]}     `);
        }
        console.log("|\n+-------+-------+-------+")
    }
    return board    
}

async function enter_move(board: any[][])
{
    let new_move = await inquirer.prompt([
    {
        message:"Enter your Move",
        type:"input",
        name:"move",
    }
    ])
    let num = parseInt(new_move.move)

    if (isNaN(num) || num < 1 || num > 9)
    {
        console.log(chalk.redBright("\nINVALID CHOICE!!! Try Again"))
        await enter_move(board)
    }
    else
    {
        let row = ((num - 1) / 3) >> 0;
        let col = (num -1) % 3;
        if (board[row][col] === " ")
        {
            board[row][col] = "O";
        }
        else
        {
            console.log(chalk.redBright("\tInvalid Choice try agian"))
            await enter_move(board)
        }
    }
    return board
}

async function draw_move(board:any[][])
{
    let comp_move = Math.floor(Math.random() * 10);
    if (comp_move >= 0 || comp_move <= 8)
    {
        let row = ((comp_move - 1) / 3) >> 0;
        let col = (comp_move - 1) % 3;
        if (board[row][col] === " ")
        {
            board[row][col] = "X"
        }
        else
        {
            draw_move(board)
        }
    return board
    }
    else
    {
        draw_move(board)
    }
    
}

async function list_of_free_field(board:any[][]) 
{
    let free = []
    for (var row = 0; row < 3; row++)
    {
        for (var col = 0; col < 3; col++)
        {
            if(!(board[row][col] in ["X","O"]))
            {
                free.push(row,col)
            }
        }
    }
    return free   
}

async function victory_for(board:any[][])
{
    for (var i = 0; i < 3; i++)
    {
        // horizontal Checks
        if (board[i][0] ==="O" && board[i][1] === "O" && board[i][2] === "O" )
        {
            return chalk.greenBright("You WIN")
        }
        else if (board[i][0] ==="X" && board[i][1] === "X" && board[i][2] === "X" )
        {
            return chalk.redBright("You LOSE")
        }
        // vertical checks
        else if (board[0][i] ==="O" && board[1][i] === "O" && board[2][i] === "O" )
        {
            return chalk.greenBright("You WIN")
        }
        else if (board[0][i] ==="X" && board[1][i] === "X" && board[2][i] === "X" )
        {
            return chalk.redBright("You LOSE")
        }
        // diagnol checks
        else if (board[0][0] ==="O" && board[1][1] === "O" && board[2][2] === "O" )
        {
            return chalk.greenBright("You WIN")
        }
        else if (board[0][0] ==="X" && board[1][1] === "X" && board[2][2] === "X" )
        {
            return chalk.redBright("You LOSE")
        }
        else if (board[0][2] ==="O" && board[1][1] === "O" && board[2][0] === "O" )
        {
            return chalk.greenBright("You WIN")
        }
        else if (board[0][2] ==="X" && board[1][1] === "X" && board[2][0] === "X" )
        {
            return chalk.redBright("You LOSE")
        }
        else if (board.every(row => row.every(cell => cell !== ' '))) {
            return "It's a DRAW!!!!";
        } 
    }
    return false   
}

async function main() {
    while (true) {
        const freeFields: number[] = await list_of_free_field(board);
        if (freeFields.length !== 0)
        {
            await draw_move(board)
            await display_board(board)
            let result = await victory_for(board)
            if (result)
            {
                console.log(chalk.blueBright("GAME OVER",result))
                break;
            }
            await enter_move(board)
            result = await victory_for(board)
            if (result)
            {
                await display_board(board)
                console.log(chalk.blueBright("GAME OVER",result))
                break;
            }
        } 
    }
}

main()
