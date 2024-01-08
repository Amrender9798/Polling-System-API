import Question from "../schemas/question.schema.js";

export const createQuestion = async (req, res) => {
    try {
        const newQuestionData = {
            title: req.body.title,
            options: [],
        };

        const question = new Question(newQuestionData);
        await question.save();

        res.json(transformQuestion(question));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        // Check if any option associated with the question has votes
        const question = await Question.findById(questionId).populate('options');
        const hasVotes = question.options.some(option => option.votes > 0);

        if (hasVotes) {
            return res.status(400).json({ error: 'Cannot delete a question with options having votes' });
        }

        // No votes, so delete the question
        await Question.deleteOne({ _id: questionId });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const viewQuestion = async (req, res) => {
    const questionId = req.params.id;

    try {
        const question = await Question.findById(questionId).populate('options');

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Transform the question structure if needed
        const transformedQuestion = transformQuestion(question);
        res.json(transformedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Helper function to transform question structure
function transformQuestion(question) {
    return {
        id: question._id,
        title: question.title,
        options: question.options.map(transformOption),
    };
}

// Helper function to transform option structure
function transformOption(option) {
    return {
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
    };
}
