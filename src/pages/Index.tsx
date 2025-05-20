
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IngredientInput from '@/components/IngredientInput';
import IngredientAnalysis from '@/components/IngredientAnalysis';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [ingredients, setIngredients] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Understand What's in Your Food
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Paste the ingredients from any food label, and we'll analyze them for you.
              Learn about potential allergens, additives, and what each ingredient really means.
            </p>
          </div>
        </section>
        
        <section className="container px-4 pb-12 md:px-6 md:pb-16 lg:pb-20">
          <div className="mx-auto max-w-3xl">
            <IngredientInput 
              ingredients={ingredients}
              setIngredients={setIngredients}
              onAnalyze={handleAnalyze}
            />
            
            {(isAnalyzing || analyzed) && (
              <IngredientAnalysis 
                ingredients={ingredients} 
                isLoading={isAnalyzing} 
              />
            )}
          </div>
        </section>
        
        <section className="container px-4 pb-12 md:px-6 md:pb-16 lg:pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-6 text-center">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">1</div>
                <h3 className="text-lg font-medium">Copy Ingredients</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Find the ingredients list on any food package and copy it exactly as it appears.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">2</div>
                <h3 className="text-lg font-medium">Paste & Analyze</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paste the ingredients into our analyzer and click the analyze button.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">3</div>
                <h3 className="text-lg font-medium">Learn & Decide</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get detailed information about each ingredient to make informed food choices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-accent py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why Analyze Food Ingredients?</h2>
              <p className="mt-4 text-muted-foreground">
                Understanding what's in your food is the first step toward healthier eating habits
                and managing dietary restrictions or allergies.
              </p>
              <Separator className="my-8" />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Identify Allergens</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Quickly spot potential allergens like nuts, dairy, gluten, or soy in food products.
                  </p>
                </div>
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Avoid Unwanted Additives</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Learn which preservatives, colorings, or flavor enhancers are in your food.
                  </p>
                </div>
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Make Better Choices</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Compare products and choose options with cleaner, more natural ingredients.
                  </p>
                </div>
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-medium">Understand Nutritional Quality</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Get insights into the overall nutritional quality based on ingredient analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
