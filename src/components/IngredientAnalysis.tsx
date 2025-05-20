
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock ingredient analysis data - in a real app, this would come from an API
const commonAllergens = [
  'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soybeans',
  'gluten', 'lactose', 'sesame', 'mustard', 'celery', 'lupin', 'molluscs', 'sulphites'
];

const commonAdditives = {
  "sugar": {
    description: "Added sweetener that can contribute to weight gain and health issues when consumed in excess.",
    category: "sweetener",
    concern: "moderate"
  },
  "high fructose corn syrup": {
    description: "Sweetener made from corn starch that may contribute to obesity and metabolic issues.",
    category: "sweetener",
    concern: "high"
  },
  "monosodium glutamate": {
    description: "Flavor enhancer that may cause adverse reactions in some individuals.",
    category: "flavor enhancer",
    concern: "moderate"
  },
  "aspartame": {
    description: "Artificial sweetener that has been linked to potential health concerns.",
    category: "sweetener",
    concern: "moderate"
  },
  "sodium nitrite": {
    description: "Preservative used in processed meats that may form potentially harmful compounds.",
    category: "preservative",
    concern: "high"
  },
  "bha": {
    description: "Butylated hydroxyanisole is a preservative that may have potential endocrine disrupting effects.",
    category: "preservative",
    concern: "high"
  },
  "bht": {
    description: "Butylated hydroxytoluene is a preservative with similar concerns to BHA.",
    category: "preservative",
    concern: "high"
  },
  "partially hydrogenated": {
    description: "Process that creates trans fats, which are associated with heart disease.",
    category: "fat",
    concern: "high"
  },
  "red 40": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate"
  },
  "yellow 5": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate"
  },
  "blue 1": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate"
  },
  "modified": {
    description: "Usually refers to modified food starch, which is used as a thickener.",
    category: "thickener",
    concern: "low"
  },
  "natural flavors": {
    description: "Can include a wide variety of plant or animal-derived flavoring agents.",
    category: "flavor",
    concern: "low"
  },
  "artificial flavors": {
    description: "Synthetic chemicals created to mimic natural flavors.",
    category: "flavor",
    concern: "moderate"
  },
  "salt": {
    description: "Common seasoning that can contribute to high blood pressure when consumed in excess.",
    category: "seasoning",
    concern: "low"
  },
  "maltodextrin": {
    description: "Highly processed carbohydrate used as a thickener or filler.",
    category: "thickener",
    concern: "moderate"
  }
};

interface IngredientAnalysisProps {
  ingredients: string;
  isLoading: boolean;
}

const IngredientAnalysis: React.FC<IngredientAnalysisProps> = ({ ingredients, isLoading }) => {
  if (!ingredients || ingredients.trim() === '') {
    return null;
  }
  
  if (isLoading) {
    return (
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse-slow"></div>
            Analyzing Ingredients...
          </CardTitle>
          <CardDescription>Please wait while we process your ingredients list</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse-slow"></div>
            <div className="h-4 w-full bg-muted rounded animate-pulse-slow"></div>
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse-slow"></div>
          </div>
          <Progress value={65} className="animate-pulse-slow" />
        </CardContent>
      </Card>
    );
  }

  // Split the ingredients into an array
  const ingredientList = ingredients
    .toLowerCase()
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');

  // Find potential allergens
  const potentialAllergens = ingredientList.filter(ingredient => 
    commonAllergens.some(allergen => ingredient.includes(allergen))
  );

  // Find additives
  const foundAdditives = ingredientList.filter(ingredient => 
    Object.keys(commonAdditives).some(additive => ingredient.includes(additive))
  );

  // Calculate nutritional quality score (mock calculation)
  const naturalIngredientsCount = ingredientList.filter(ingredient => 
    !Object.keys(commonAdditives).some(additive => ingredient.includes(additive))
  ).length;
  
  const nutritionScore = Math.round(
    (naturalIngredientsCount / ingredientList.length) * 100
  );

  // Display the analysis
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Ingredient Analysis Results</CardTitle>
        <CardDescription>Breakdown of your food product ingredients</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="allergens">Allergens</TabsTrigger>
            <TabsTrigger value="additives">Additives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Nutrition Quality Score</h3>
                <div className="flex items-center mt-2">
                  <Progress value={nutritionScore} className="h-2" />
                  <span className="ml-2 text-sm font-medium">{nutritionScore}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on the ratio of natural to processed ingredients
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">Quick Summary</h3>
                <div className="grid gap-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Ingredients</span>
                    <span className="text-sm font-medium">{ingredientList.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Potential Allergens</span>
                    <span className="text-sm font-medium">{potentialAllergens.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Additives Detected</span>
                    <span className="text-sm font-medium">{foundAdditives.length}</span>
                  </div>
                </div>
              </div>
              
              {potentialAllergens.length > 0 && (
                <>
                  <Separator />
                  <Alert>
                    <AlertDescription>
                      <strong>Allergen Alert:</strong> This product may contain allergens including{' '}
                      {potentialAllergens.map((allergen, i) => (
                        <span key={i} className="font-medium">
                          {allergen}{i < potentialAllergens.length - 1 ? ', ' : ''}
                        </span>
                      ))}.
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ingredient List</h3>
              <ul className="space-y-2">
                {ingredientList.map((ingredient, index) => {
                  const isAdditive = Object.keys(commonAdditives).some(additive => 
                    ingredient.includes(additive)
                  );
                  const isAllergen = commonAllergens.some(allergen => 
                    ingredient.includes(allergen)
                  );
                  
                  return (
                    <li key={index} className="flex items-center">
                      <span className="text-sm">{ingredient}</span>
                      <div className="ml-auto flex gap-2">
                        {isAllergen && <Badge variant="destructive">Allergen</Badge>}
                        {isAdditive && <Badge variant="outline">Additive</Badge>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="allergens">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Potential Allergens</h3>
              {potentialAllergens.length > 0 ? (
                <ul className="space-y-2">
                  {potentialAllergens.map((allergen, index) => (
                    <li key={index} className="p-3 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 rounded-md">
                      {allergen}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No common allergens were detected in the ingredients list.
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Note: This analysis is not a substitute for medical advice. If you have food allergies, 
                always consult the manufacturer for the most accurate information.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="additives">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detected Additives</h3>
              {foundAdditives.length > 0 ? (
                <ul className="space-y-3">
                  {foundAdditives.map((additive, index) => {
                    const matchedAdditive = Object.entries(commonAdditives).find(([key]) => 
                      additive.includes(key)
                    );
                    
                    if (!matchedAdditive) return null;
                    const [key, info] = matchedAdditive;
                    
                    return (
                      <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{additive}</span>
                          <Badge 
                            variant={
                              info.concern === "high" ? "destructive" : 
                              info.concern === "moderate" ? "outline" :
                              "secondary"
                            }
                          >
                            {info.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No common additives were detected in the ingredients list.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IngredientAnalysis;
