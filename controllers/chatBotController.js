import dotenv from 'dotenv';
import OpenAI from 'openai';

// Initialize OpenAI with the API key
dotenv.config();
const OPEN_AI_KEY = process.env.VITE_OPEN_AI_KEY; // Make sure to set VITE_OPEN_AI_KEY in your .env file
const openai = new OpenAI({ apiKey: OPEN_AI_KEY, dangerouslyAllowBrowser: true });

// Function to call the OpenAI API
export async function API(prompt) {
    try {
        // Make a request to the OpenAI API
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Specify the model to use
            messages: [
                {
                    role: "system",
                    content: "You are a helpful personal trainer. Please answer the user's question in simple terms."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.5 // Optional parameter to control the randomness of the output
        });

        
        checkMusclesUsed(response.choices[0].message.content);
        // Return the response content
        return response.choices[0].message.content;
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to get response from OpenAI');
    }
}

async function checkMusclesUsed(previousResponse) {
    const muscleList = {
        // "biceps": "biceps",
        "gluteusmedius": "GluteusMedius",
        "lowerabsupper": "LowerAbsUpper",
        "peroneuslongus": "PeroneusLongus",
        "soleus": "Soleus",
        "calvesmedialhead": "CalvesMedialHead",
        "outerquads": "OuterQuads",
        "innerquads": "InnerQuads",
        "midquad": "MidQuad",
        "sartoriusinnerleg": "SartoriusInnerLeg",
        "pectiniusinnergroinmuscle": "PectiniusInnerGroinMuscle",
        "extensorforearmlower": "ExtensorForearmLower",
        "flexordigitoriumunderarm": "FlexorDigitoriumUnderArm",
        "brachioradialisforarmupper": "BrachioradialisForArmUpper",
        "forearmupper": "ForearmUpper",
        "upperabs": "UpperAbs",
        "lowerabs": "LowerAbs",
        "serratusanterior": "SerratusAnterior",
        "obliquesexternal": "ObliquesExternal",
        "bicepsbrachialis": "BicepsBrachialis",
        "sternocleids": "Sternocleids",
        "scm": "Scm",
        "fronttraps": "FrontTraps",
        "tricepslonghead": "TricepsLongHead",
        "bicepsbrachii": "BicepsBrachii",
        "deltoidsfront": "DeltoidsFront",
        "pecs": "Pecs",
        "tricepslateralhead": "TricepsLateralHead",
        "rhomboidmajor": "RhomboidMajor",
        "semimembranosis": "Semimembranosis",
        "traps": "Traps",
        "calves": "Calves",
        "delts": "Delts",
        "middleandlowertraps": "MiddleAndLowerTraps",
        "infraspinatus": "Infraspinatus",
        "teresmajor": "TeresMajor",
        "lats": "Lats",
        "triceps": "Triceps",
        "obliques": "Obliques",
        "upperoblilques": "UpperOblilques",
        "extensorcarpi": "ExtensorCarpi",
        "extensordigitorum": "ExtensorDigitorum",
        "extensorcarpiulnaris": "ExtensorCarpiUlnaris",
        "gluteusmaximus": "GluteusMaximus",
        "semitedinosis": "SemiTedinosis",
        "upperinnerhamstring": "UpperInnerHamstring",
        "bicepsfemoris": "BicepsFemoris",
    };
    console.log('Muscle List:', muscleList);
    const prompt =`Analyze this text and categorize the mentioned muscles into primary and secondary groups:
    "${previousResponse}"

    Use ONLY muscles from this list: ${Object.keys(muscleList).join(', ')}

    Rules:
    - Primary muscles are the main target muscles
    - Secondary muscles assist or stabilize
    - Only include muscles explicitly mentioned
    - If not in the provided list, exclude it

    Respond EXACTLY in this format:
    Primary: [comma-separated list here]
    Secondary: [comma-separated list here]`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a fitness expert. Analyze exercise descriptions and categorize muscles into primary and secondary groups. Only respond in the specified format."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.3  // Lower temperature for more consistent formatting
    });
    console.log(response.choices[0].message.content);
    const primaryMuscles = [];
    const secondaryMuscles = [];
    const musclesUsed = response.choices[0].message.content;

    const primaryMatch = musclesUsed.match(/Primary:\s*(.*?)(?=\n|$)/i);
    const secondaryMatch = musclesUsed.match(/Secondary:\s*(.*?)(?=\n|$)/i);

    if (primaryMatch) {
        const primaryList = primaryMatch[1].split(',').map(m => m.trim().toLowerCase());
        primaryMuscles.push(...primaryList.filter(muscle => muscleList[muscle]));
    }

    if (secondaryMatch) {
        const secondaryList = secondaryMatch[1].split(',').map(m => m.trim().toLowerCase());
        secondaryMuscles.push(...secondaryList.filter(muscle => muscleList[muscle]));
    }

    const primary = primaryMuscles.map(muscle => muscleList[muscle]);
    const secondary = secondaryMuscles.map(muscle => muscleList[muscle]);

    console.log('Primary:', primary);
    console.log('Secondary:', secondary);
    recolor(primary, secondary);
}


function recolor(primary, secondary) {
    try {
        const frontSvg = document.querySelector(".frontSvg");
        const backSvg = document.querySelector(".backSvg");

        if (frontSvg && backSvg) {
            // Reset all paths to default class (st0)
            document.querySelectorAll('[class^="st"]').forEach(path => {
                path.setAttribute("class", "st1");
            });

            // Color primary muscles with st1 class
            primary.forEach(muscle => {
                // Front view
                const frontElements = frontSvg.querySelectorAll(`#${muscle}`);
                frontElements.forEach(el => el.setAttribute("class", "st2"));

                // Back view
                const backElements = backSvg.querySelectorAll(`#${muscle}`);
                backElements.forEach(el => el.setAttribute("class", "st2"));
            });

            // Color secondary muscles with st2 class
            secondary.forEach(muscle => {
                // Front view
                const frontElement = frontSvg.querySelector(`#${muscle}`);
                frontElement.forEach(el => el.setAttribute("class", "st3"));

                // Back view
                const backElement = backSvg.querySelector(`#${muscle}`);
                backElement.forEach(el => el.setAttribute("class", "st3"));
            });
        }
    } catch (err) {
        console.error('Error recoloring muscles:', err);
    }
}