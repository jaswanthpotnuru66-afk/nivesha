# Nivesha investor chatbot demo
The original bundled homepage is served as public/homepage.html. The outer page adds the Ask Nivesha panel. This prototype keeps chat in browser memory and sends each prompt and recent turns to Gemini. Use fictional or approved notes. The original enquiry remains a design preview.
## Google AI Studio
Extract this folder, add its files to a GitHub repository, then choose Build → Add files → Import from GitHub in Google AI Studio. Ask Build to run the existing Node app with npm run dev, preserve public/homepage.html, and expose the server port in Preview. Set GEMINI_API_KEY in server secrets. Set GEMINI_MODEL to an available generateContent-compatible text model if needed. Keep the demo preview private.
## Local preview
Use Node 20 or later. Set GEMINI_API_KEY in the server environment, then run npm start and open http://localhost:3000. No npm dependencies are required.
## Try it
Ask: I only consider equity. Does the food-processing demo fit?
Then: What changes if founder cash falls by 20%?
For meeting review, paste two questions and fictional notes. Check whether an unmentioned question is marked not discussed. This version accepts text notes; recording and audio uploads are future additions.
