// Write a NodeJS script to take 2 elements 1 & 1000 using file system module & find
// Kaprekar numbers between them. A Kaprekar number is a number whose square when
// divided into two parts and such that sum of parts is equal to the original number and
// none of the parts has value 0. 

const fs=require('fs');

function iskaprekar(num)
{
    const square=(num*num).toString();
    const length=square.length;

    const leftside=square.substring(0,length-num.toString().length);
    const rightside=square.substring(length-num.toString().length);

    const left=parseInt(leftside)||0;
    const right=parseInt(rightside)||0;
    
    return(left+right===num);
}

function findKaprekarNumber(start,end,filename)
{
    let result=[];

    for(let i=start;i<=end;i++)
    {
        if(iskaprekar(i))
        {
            result.push(i);
        }

    }
    fs.writeFile(filename, result.join(', '), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Kaprekar numbers written to ${filename}`);
        }
    });
}

findKaprekarNumber(1,1000,'Q1.txt');
