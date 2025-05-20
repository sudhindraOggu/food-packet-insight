
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface IngredientInputProps {
  ingredients: string;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
  onAnalyze: () => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ 
  ingredients, 
  setIngredients, 
  onAnalyze 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim() === '') {
      toast.error("Please enter ingredients to analyze");
      return;
    }
    onAnalyze();
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
                Paste Food Ingredients
              </label>
              <Textarea
                id="ingredients"
                placeholder="Example: Water, Sugar, Modified Corn Starch, Salt, Natural Flavors..."
                className="min-h-[120px]"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Copy the ingredients list exactly as it appears on the food package.
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Analyze Ingredients
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IngredientInput;
