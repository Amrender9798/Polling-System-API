import Option from "../schemas/option.schema.js";
import Question from "../schemas/question.schema.js";

export const createOption = async (req, res) => {
    const questionId = req.params.id;

    try {
        const question = await Question.findOne({ _id: questionId });

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const newOptionData = {
            text: req.body.text,
            votes: 0,
        };

        const option = new Option(newOptionData);

        await option.save();

        await Question.updateOne(
            { _id: questionId },
            { $push: { options: option._id } }
        );

        res.json(transformOption(option));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteOption = async (req, res) => {
    try {
        const optionId = req.params.id;

        // Check if the option has votes
        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        if (option.votes > 0) {
            return res.status(400).json({ error: 'Cannot delete an option with votes' });
        }

        // No votes, so delete the option
        await Option.deleteOne({ _id: optionId });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addVote = async (req, res) => {
    const optionId = req.params.id;

    try {
        // Increment vote count for the option
        await Option.updateOne(
            { _id: optionId },
            { $inc: { votes: 1 } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Helper function to transform option structure
function transformOption(option) {
    return {
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
    };
}

