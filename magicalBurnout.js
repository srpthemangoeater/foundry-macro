const current = getProperty(actor.data.data, 'resources.secondary.value');
const burnoutDice = new Roll(`1d${current}`);
await burnoutDice.roll();
burnoutDice.toMessage({ flavor: "Magical burnout" });

// 01-05	Drained: Lose (spell level) hit dice.
// 06-15	Reduced: Lose (spell level / 2) hit dice.
// 16-40	Shocked: Lose (spell level x 4) hit points.
// 41-88	Hurt: Lose (spell level x 2) hit points.
// 89-93	Blackout: You have disadvantage when casting spells for (spell level) rounds.
// 94	    Immolated: Shrink the burnout die to d4.
// 95	    Gifted: Regain this spell slot.
// 96	    Renewed: Regain (spell level) hit dice.
// 97	    Healed: Gain (spell level x 4) hit points.
// 98	    Protected: Gain (spell level x 4) temporary hit points.
// 99	    Energized: You have advantage when casting spells for (spell level) rounds.
// 100	    Restored: Reset the burnout die to d12.

if (burnoutDice.total <= 2) {
    const botable = [
        "Drained: Lose (spell level) hit dice.",
        "Reduced: Lose (spell level / 2) hit dice.",
        "Shocked: Lose (spell level x 4) hit points.",
        "Hurt: Lose (spell level x 2) hit points.",
        "Blackout: You have disadvantage when casting spells for (spell level) rounds.",
        "Immolated: Shrink the burnout die to d4.",
        "Gifted: Regain this spell lot.",
        "Renewed: Regain (spell level) hit dice.",
        "Healed: Gain (spell level x 4) hit points.",
        "Protected: Gain (spell level x 4) temporary hit points.",
        "Energized: You have advantage when casting spells for (spell level) rounds.",
        "Restored: Reset the burnout die to d12."
    ];

    const r2 = new Roll('1d100');
    await r2.roll();
    r2.toMessage({ flavor: "Your spell burnout failed!" });

    let cr2 = 0;
    if (r2.total === 100) cr2 = 12;
    else if (r2.total <= 5) cr2 = 1;
    else if (r2.total <= 15) cr2 = 2;
    else if (r2.total <= 40) cr2 = 3;
    else if (r2.total <= 88) cr2 = 4;
    else if (r2.total <= 93) cr2 = 5;
    else if (r2.total == 94) cr2 = 6;
    else if (r2.total == 95) cr2 = 7;
    else if (r2.total == 96) cr2 = 8;
    else if (r2.total == 97) cr2 = 9;
    else if (r2.total == 98) cr2 = 10;
    else if (r2.total == 99) cr2 = 11;

    let l_current = current;
    if (current > 4 && cr2 !== 6 && cr2 !== 12) l_current -= 2;
    if (cr2 === 6) l_current = 4;
    if (cr2 === 12) l_current = 12;

    await actor.update({ "data.resources.secondary.value": l_current });
    ChatMessage.create({ content: botable[cr2 - 1] });
}