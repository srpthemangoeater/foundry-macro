const itemId = 'ammoitemid'; //place item id here
const item = actor.items.get(itemId);

if (item) {
    const quantity = item.data.data.quantity;
    
    const ammoDice = new Roll(`1d${quantity}`);
    await ammoDice.roll();

    ammoDice.toMessage({
        flavor: `Ammunition Die : ${item.name}`,
    })

    let nextValue = quantity;

    const ammoDiceValues = [20, 12, 10, 8, 6, 4, 1, 0];

    if (ammoDice.total <= 2 && ammoDiceValues.includes(quantity)) {
        const currentIndex = ammoDiceValues.indexOf(quantity);
        nextValue = ammoDiceValues[currentIndex + 1];
    }
    
    await item.update({ 'data.quantity': nextValue });
    ChatMessage.create({ content: `Current ${item.name}'s ammo dice: ${getQuantityDisplay(nextValue)}` });
} else {
    ChatMessage.create({ content: "Ammunition not found" });
}

function getQuantityDisplay(quantity) {
    return quantity > 1 ? `d${quantity}` : quantity.toString();
}