import { data } from './art.js'

// wait function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// take the html element and the animation
const render = async (element, animation) => {
    // some animations have two steps (walk into frame then repeat second step)
    // if the animation has a step end index, render it in steps
    if (animation.step_end_index) {
        // first step
        for (let index = 0; index < animation.step_end_index; index++) {
            element.innerHTML = animation.frames[index];
            await delay(500);
        }

        // 2nd step, repeat forever
        while (true) {
            for (let index = animation.step_end_index; index < animation.frames.length; index++) {
                element.innerHTML = animation.frames[index];
                await delay(500);
            }
        }
    }
    else {
        // repeat forever
        while (true) {
            for (let index = 0; index < animation.frames.length; index++) {
                element.innerHTML = animation.frames[index];
                await delay(500);
            }
        }
    }
}

// get the p tags we want to put animations in
let animations = document.getElementsByClassName("animate")
for (let element of animations) {
    // get the name of the animation from the html text
    const name = element.innerHTML;

    // find the animation in the array
    const animation = data.find(animation => animation.name === name);

    // play the animation
    render(element, animation);
}
