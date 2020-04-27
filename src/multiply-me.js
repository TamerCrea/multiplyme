var $ = require('jquery');


(function () {
 
    let num1 = "";
    let num2 = "";
    let resultArray = [];
 
    $(".randomGen").click(function () {
        $(this).prev().val(gRandom(99999999999999999));
    });

    $("#resolve").click(function () {
        resultArray = [];
        stepArray = [];
        num1 = gNumberFromInput(1);
        num2 = gNumberFromInput(2);
//        console.log("type n1", typeof num1, "      type n2", typeof num2); 
        $("#explanation").text("");
        rowToAdd = `<div> ${num1} <div>`;
        rowToAdd += `<div>x &nbsp; &nbsp; ${num2}</div>`;
        rowToAdd += `-------------------------------------------------`;
        $("#explanation").append(rowToAdd);

        multiplyMulti(num1, num2);
    });

    function multiplyMulti(a, b) {
        let zeroPad;
        let tempResult;
        let stepArray = [];

        // Nos aseguramos de que el termino A tenga longitud mayor que el termino B
        if (a.length < b.length) {
            let c = a;
            a = b;
            b = c;
        }
//      console.log("a: ", a, "           b; ", b);
//      console.log("  a bfor", a, "            type: ", typeof a, "        length: ", a.length);
        // Convertimos cada numero en Array
        a = a.toString().split('');
        b = b.toString().split('');
//      console.log("  a aftr", a);

        for (let j = b.length - 1; j >= 0; j--) {
//            console.log("j:", j, "    b[" + j + "]:", b[j]);
            for (let i = a.length - 1; i >= 0; i--) {
//                console.log("   i:", i, "    a[" + i + "]:", a[i]);

                if (i === a.length - 1) {
//                    console.log("a.length - 1");
                    zeroPad = "";
                }
//                 console.log("--typeof -  a[i]" , typeof a[i] ,  "      b[j]", typeof b[j] );
                a[i] = parseInt(a[i]);
                b[j] = parseInt(b[j]);
                tempResult = gMultiSingle(a[i], b[j]) + gZeros(zeroPad);
                //  console.log("tempResult", tempResult, "       typeof", typeof tempResult);
                stepArray.unshift(tempResult);
                //  console.log("stepArray", stepArray);

                if (i === 0) {
                    // disponemos de los valores para una fila de resultados
                    // hacemos que todos los valores tengan la misma longitud poniendo ceros por delante
//                    console.log("stepArray", stepArray);
                    stepArray = gAddZerosBefore(stepArray);
//                    console.log("1 stepArray", stepArray);
                    stepArray = gArrayOfArrays(stepArray);
//                    console.log("2 stepArray", stepArray);
                    stepArray = getTransponArray(stepArray);
//                    console.log("3 stepArray", stepArray);
                    stepArray = gSumRow(stepArray);
//                    console.log("4 stepArray", stepArray);
                    resultArray.push(stepArray);

                    stepArray = [];
                }
                zeroPad++;
            } // for i 
        } // for j 
        resultArray = gAddZerosAfter(resultArray);
        //////////// Aquí podemos presentar información de las rows de resultado
        displayRows(resultArray);
        resultArray = gAddZerosBefore(resultArray);
        resultArray = getTransponArray(resultArray);
        resultArray = gSumRow(resultArray);
        displayResult(resultArray);
//        console.log("resultArray", resultArray);

    }

    displayResult = function (resultArray) {
//        console.log("result", typeof (resultArray));
        let finalRow = "";
        finalRow += `<div>-------------------------------------------------</div>`;
        finalRow += `<div>  ${gRemoveCommas(resultArray.toString())} </div>`;
        finalRow += `<div>-------</div>`;
        finalRow += `<div>Direct result:         ${solveDirectly(num1, num2)}</div>`;
        $("#explanation").append(finalRow);
    };


    displayRows = function (myArray) {
//        console.log("myArray", myArray);
        let myNum;
        let myRows = "";
        for (let i = 0; i < myArray.length; i++) {
            myNum = gRemoveCommas(myArray[i]);
            myRows += "<div>" + myNum + "</div>";
//            console.log("myNum", myNum);
        }
        $("#explanation").append(myRows);
    };



    function gSumRow(myArray) {
        // Obtenemos cada una de las filas de resultados haciendo la suma pertinente y
        // posteriormente añadiendo los ceros finales necesarios
//        console.log("gSumRow", myArray);
        let rowArray = [];
        let currentArray = [];
        let currentSum;

        for (let y = 0; y < myArray.length; y++) {
            currentSum = 0;
            for (let x = 0; x < myArray[y].length; x++) {
                // console.log("parseInt(myArray[y][x]", parseInt(myArray[y][x]));
                currentSum += parseInt(myArray[y][x]);
            }
//            console.log("currentSum", currentSum, "      type", typeof currentSum, "      length", currentSum.toString().length);

            if (gArray(currentSum).length > 1) {
                // el valor de currentSum es igual o mayor a 10 (tiene 2 o más digitos)
                currentArray = gArray(currentSum);
                let step = 0;
                for (let i = currentArray.length - 1; i >= 0; i--) {
                    if (i === currentArray.length - 1) {
                        // metemos el último valor de currentArray en la array de resultados finales
                        rowArray.unshift(parseInt(currentArray[i]));
                    } else {
                        // tenemos que poner los valores restantes en la array inicial para añadirlos a la suma
                        if (y + step === myArray.length) {
//                            console.log("OJOOOOOOOOOOOOOOOOOOOOOOOOO!!!!!");
                            myArray.push(currentArray[i]);
                        } else {
//                            console.log("--- myArray", myArray);
//                            console.log("--- y / step ", y, step);
//                            console.log("--- currentArray[i]", currentArray[i]);
                            myArray[y + step].push(currentArray[i]);
                        }
//                        console.log("arrayModificada" , myArray);
                    }
                    step++;
                }
//                console.log("--",currentArray, " length", currentArray.length);
            } else {
                // el valor es inferior a 10 ( solo tiene un digito), lo metemos en la array
//                console.log("currentSum", currentSum);
                rowArray.unshift(currentSum);
//                console.log("rowArray", rowArray);
            }
//          console.log("rowArray", rowArray , "length" , rowArray.length);

        }
        return rowArray;
    }

    function gRemoveCommas(myString) {
        return myString.replace(/,/g, "");
    }
    function gAddZerosAfter(myArray) {
//        console.log("myArray", myArray);
        let zeros = "";
        for (let i = 0; i < myArray.length; i++) {
            myArray[i] = myArray[i] + zeros;
            zeros += ",0";
        }
        return myArray;
    }
    function gArrayOfArrays(myArray) {
        let newArray = [];
        for (let i = 0; i < myArray.length; i++) {
            newArray[i] = gArray(myArray[i]);
        }
        //console.log("newArray", newArray);
        return newArray;
    }
    function getTransponArray(myArray) {
//        console.log("TransponArray", myArray);
        let dimX = myArray[0].length;
        let transArray = new Array(dimX);
        let dimY = myArray.length;

        for (let x = 0; x < dimX; x++) {
            transArray[x] = [];
            for (let y = dimY - 1; y >= 0; y--) {
                transArray[x][y] = myArray[y][dimX - 1 - x];
            }
        }
//        console.log("Transpuesta", transArray);
        return transArray;
    }
    function gAddZerosBefore(myArray) {
//        console.log("myArray:", myArray);
        // primero nos aseguramos que las arrays no tienen comas
        for (let i = 0; i < myArray.length; i++) {
            myArray[i] = gRemoveCommas(myArray[i]);
        }
        // segundo, añadimos los ceros pertinentes
        for (let i = 0; i < myArray.length; i++) {
            while (myArray[i].length < gLongestValue(myArray)) {
                myArray[i] = "0" + myArray[i];
            }
            ;
        }
//        console.log("myArray con ceros:", myArray);
        return myArray;
    }
    function gLongestValue(myArray) {
        let longest = 0;
        for (let i = 0; i < myArray.length; i++) {
            longest = myArray[i].length > longest ? myArray[i].length : longest;
        }
        return longest;
    }
    function gMultiSingle(a, b) {
        let res = a;
        for (let i = 1; i < b; i++) {
            res += a;
        }
        return res;
    }
    function gZeros(amount) {
        zeros = "";
        for (let i = 0; i < amount; i++) {
            zeros += "0";
        }
        return zeros;
    }
    function solveDirectly(a, b) {
        return a * b;
    }
    function gNumberFromInput(x) {
        return $("#num" + x).val();
    }
    function gRandom(max) {
        return Math.floor(Math.random() * max);
    }
    function gArray(num) {
        return (num).toString().split('');
    }
})();
