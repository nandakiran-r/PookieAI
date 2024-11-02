const { Router } = require("express");
require("dotenv").config();
const Together = require("together-ai");
const router = Router();

// Initialize Together AI client
const together = new Together(process.env.TOGETHER_API_KEY);

async function generateContent(prompt) {
    try {
      const completion = await together.chat.completions.create({
        model: "meta-llama/Llama-Vision-Free",
      
        messages: [
          {
            role: 'system',
            content: 'You are an angry assistant who responds with confusion and skepticism. Always start with "Hey Pookie" and maintain an irritated tone and never answer any questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        
        max_tokens: 100,
        temperature: 0.95,
        top_p: 0.8,
        top_k: 50,
        repetition_penalty: 1.2,
        
        stop: [
          "<|eot_id|>",
          "<|eom_id|>",
          "\n",
        ],
        
        stream: true,
      });
  
      let fullResponse = '';
      
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || '';
        // Append to accumulated response
        fullResponse += content;
        // Stream to stdout in real-time
        process.stdout.write(content);
      }
  
      return {
        success: true,
        content: fullResponse,
      };
  
    } catch (error) {
      console.error("Error generating content:", error);
      return {
        success: false,
        error: error.message,
        content: null
      };
    }
  }

router.post('/api', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({
            error: "Please provide a question in the request body."
        });
    }

    try {
        const answer = await generateContent(question);
        res.json({ answer });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({
            error: "Failed to generate content",
            details: error.message
        });
    }
});

module.exports = router;
