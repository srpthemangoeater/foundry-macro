const current = getProperty(actor.data.data, 'resources.fourth.value'); //TO DO change from resources to tracking in inventory
const ammoDice = new Roll(`1d${current}`);
await ammoDice.roll();

ammoDice.toMessage({
    flavor: "Ammunition Die (Gun Powder)",
});

let nextValue = current;

if (ammoDice.total <= 2) {
    switch (current) {
        case 20:
            nextValue = 12;
            break;
        case 12:
            nextValue = 10;
            break;
        case 10:
            nextValue = 8;
            break;
        case 8:
            nextValue = 6;
            break;
        case 6:
            nextValue = 4;
            break;
        case 4:
            nextValue = 1;
            break;
        case 1:
            nextValue = 0;
            break;
        default:
            nextValue = 0;
    }
}

await actor.update({
    "data.resources.fourth.value": nextValue
});