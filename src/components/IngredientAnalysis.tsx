import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertCircle, ShieldAlert, Wine, Heart, HeartCrack, HealthIcon, Skull } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

// Expanded ingredient analysis data with health impacts
const commonAllergens = [
  'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soybeans',
  'gluten', 'lactose', 'sesame', 'mustard', 'celery', 'lupin', 'molluscs', 'sulphites'
];

const commonAdditives = {
  "sugar": {
    description: "Added sweetener that can contribute to weight gain and health issues when consumed in excess.",
    category: "sweetener",
    concern: "moderate",
    shortTermEffects: "Blood sugar spikes, energy crashes, increased hunger",
    longTermEffects: "Obesity, type 2 diabetes, cardiovascular disease, dental problems",
    regulatoryStatus: "Generally recognized as safe (GRAS) by FDA, but with recommended limits",
    dailyLimit: "Less than 10% of daily calories (WHO recommendation)",
    alternativesRisk: "Low, when consumed in moderation"
  },
  "high fructose corn syrup": {
    description: "Sweetener made from corn starch that may contribute to obesity and metabolic issues.",
    category: "sweetener",
    concern: "high",
    shortTermEffects: "Blood sugar spikes, increased appetite, digestive discomfort",
    longTermEffects: "Obesity, insulin resistance, fatty liver disease, increased risk of type 2 diabetes",
    regulatoryStatus: "FDA approved, but with health concerns",
    dailyLimit: "Should be minimized or avoided",
    alternativesRisk: "High, especially with regular consumption"
  },
  "monosodium glutamate": {
    description: "Flavor enhancer that may cause adverse reactions in some individuals.",
    category: "flavor enhancer",
    concern: "moderate",
    shortTermEffects: "Headaches, flushing, sweating, facial pressure (in sensitive individuals)",
    longTermEffects: "Possible contribution to obesity and metabolic disorders",
    regulatoryStatus: "FDA approved as GRAS, but controversial",
    dailyLimit: "No official limits established",
    alternativesRisk: "Moderate, particularly in sensitive individuals"
  },
  "aspartame": {
    description: "Artificial sweetener that has been linked to potential health concerns.",
    category: "sweetener",
    concern: "moderate",
    shortTermEffects: "Headaches, dizziness, digestive issues in sensitive individuals",
    longTermEffects: "Controversial - possible neurological effects and cancer risk (research ongoing)",
    regulatoryStatus: "FDA approved with ADI (Acceptable Daily Intake) limits",
    dailyLimit: "50 mg/kg body weight/day (FDA)",
    alternativesRisk: "Moderate, controversial long-term safety"
  },
  "sodium nitrite": {
    description: "Preservative used in processed meats that may form potentially harmful compounds.",
    category: "preservative",
    concern: "high",
    shortTermEffects: "Rare allergic reactions, headaches in sensitive individuals",
    longTermEffects: "Forms nitrosamines (carcinogens), linked to colorectal cancer and other cancers",
    regulatoryStatus: "FDA approved with limits, classified as probably carcinogenic by WHO",
    dailyLimit: "3.7 mg/kg body weight/day (FDA)",
    alternativesRisk: "High, especially with regular processed meat consumption"
  },
  "bha": {
    description: "Butylated hydroxyanisole is a preservative that may have potential endocrine disrupting effects.",
    category: "preservative",
    concern: "high",
    shortTermEffects: "Rare allergic reactions",
    longTermEffects: "Possible endocrine disruption, potential carcinogen (in animal studies)",
    regulatoryStatus: "FDA approved with limits, banned in some countries, listed as possible carcinogen",
    dailyLimit: "0.5 mg/kg body weight/day",
    alternativesRisk: "High, especially with regular consumption"
  },
  "bht": {
    description: "Butylated hydroxytoluene is a preservative with similar concerns to BHA.",
    category: "preservative",
    concern: "high",
    shortTermEffects: "Rare allergic reactions",
    longTermEffects: "Potential endocrine disruptor, liver and kidney effects (in animal studies)",
    regulatoryStatus: "FDA approved with limits, controversial",
    dailyLimit: "0.5 mg/kg body weight/day",
    alternativesRisk: "High, especially with regular consumption"
  },
  "partially hydrogenated": {
    description: "Process that creates trans fats, which are associated with heart disease.",
    category: "fat",
    concern: "high",
    shortTermEffects: "None immediately apparent",
    longTermEffects: "Increased LDL (bad) cholesterol, decreased HDL (good) cholesterol, increased heart disease risk",
    regulatoryStatus: "Banned in many countries including the US since 2018",
    dailyLimit: "Should be completely avoided",
    alternativesRisk: "Very high, no safe level of consumption"
  },
  "red 40": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate",
    shortTermEffects: "Possible hyperactivity in children, allergic reactions in sensitive individuals",
    longTermEffects: "Potential link to attention disorders, controversial cancer risk",
    regulatoryStatus: "FDA approved, banned in some European countries",
    dailyLimit: "7 mg/kg body weight/day",
    alternativesRisk: "Moderate, particularly for children"
  },
  "yellow 5": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate",
    shortTermEffects: "Possible hyperactivity in children, allergic reactions in sensitive individuals",
    longTermEffects: "Potential link to attention disorders",
    regulatoryStatus: "FDA approved, requires warning label in some countries",
    dailyLimit: "5 mg/kg body weight/day",
    alternativesRisk: "Moderate, particularly for children"
  },
  "blue 1": {
    description: "Artificial color that may cause allergic reactions or hyperactivity in some children.",
    category: "color",
    concern: "moderate",
    shortTermEffects: "Possible hyperactivity in children, allergic reactions in sensitive individuals",
    longTermEffects: "Limited evidence of harm, but concerns persist",
    regulatoryStatus: "FDA approved, restricted in some countries",
    dailyLimit: "12.5 mg/kg body weight/day",
    alternativesRisk: "Moderate, particularly for children"
  },
  "modified": {
    description: "Usually refers to modified food starch, which is used as a thickener.",
    category: "thickener",
    concern: "low",
    shortTermEffects: "Rare digestive discomfort in sensitive individuals",
    longTermEffects: "Generally considered safe, minimal concerns",
    regulatoryStatus: "FDA approved as GRAS",
    dailyLimit: "No specific limits",
    alternativesRisk: "Low, generally recognized as safe"
  },
  "natural flavors": {
    description: "Can include a wide variety of plant or animal-derived flavoring agents.",
    category: "flavor",
    concern: "low",
    shortTermEffects: "Possible allergic reactions if derived from common allergens",
    longTermEffects: "Generally considered safe, but composition is often proprietary",
    regulatoryStatus: "FDA approved as GRAS",
    dailyLimit: "No specific limits",
    alternativesRisk: "Low to moderate, depends on specific source"
  },
  "artificial flavors": {
    description: "Synthetic chemicals created to mimic natural flavors.",
    category: "flavor",
    concern: "moderate",
    shortTermEffects: "Rare sensitivities or allergic reactions",
    longTermEffects: "Generally considered safe in amounts typically used",
    regulatoryStatus: "FDA approved with testing requirements",
    dailyLimit: "No specific limits",
    alternativesRisk: "Low to moderate, depends on specific compounds"
  },
  "salt": {
    description: "Common seasoning that can contribute to high blood pressure when consumed in excess.",
    category: "seasoning",
    concern: "low",
    shortTermEffects: "Water retention, temporary blood pressure increase",
    longTermEffects: "Hypertension, increased risk of cardiovascular disease, kidney problems",
    regulatoryStatus: "FDA approved as GRAS, but with recommended limits",
    dailyLimit: "Less than 2,300 mg sodium per day (FDA)",
    alternativesRisk: "Low in moderation, high with excessive consumption"
  },
  "maltodextrin": {
    description: "Highly processed carbohydrate used as a thickener or filler.",
    category: "thickener",
    concern: "moderate",
    shortTermEffects: "Blood sugar spikes, especially in diabetics",
    longTermEffects: "Potential contribution to blood sugar disorders, gut microbiome disruption",
    regulatoryStatus: "FDA approved as GRAS",
    dailyLimit: "No specific limits",
    alternativesRisk: "Moderate, especially for diabetics"
  },
  "potassium sorbate": {
    description: "Preservative used to inhibit mold and yeast growth.",
    category: "preservative",
    concern: "low",
    shortTermEffects: "Rare allergic reactions in sensitive individuals",
    longTermEffects: "Generally considered safe in amounts typically used",
    regulatoryStatus: "FDA approved as GRAS",
    dailyLimit: "25 mg/kg body weight/day",
    alternativesRisk: "Low, considered one of the safer preservatives"
  },
  "calcium propionate": {
    description: "Preservative commonly used in bread products to prevent mold growth.",
    category: "preservative",
    concern: "low",
    shortTermEffects: "Rare digestive discomfort in sensitive individuals",
    longTermEffects: "Some controversial studies link to behavioral issues in children",
    regulatoryStatus: "FDA approved as GRAS",
    dailyLimit: "No specific limits",
    alternativesRisk: "Low to moderate, controversial"
  },
  "carrageenan": {
    description: "Thickening agent derived from seaweed used in dairy and non-dairy products.",
    category: "thickener",
    concern: "moderate",
    shortTermEffects: "Digestive discomfort in some individuals",
    longTermEffects: "Controversial links to inflammation and digestive disorders",
    regulatoryStatus: "FDA approved but controversial",
    dailyLimit: "No specific limits",
    alternativesRisk: "Moderate, particularly for those with digestive issues"
  },
  "caramel color": {
    description: "Coloring agent made by heating carbohydrates, often used in colas and soy sauce.",
    category: "color",
    concern: "moderate",
    shortTermEffects: "Rare allergic reactions",
    longTermEffects: "Some types contain 4-MEI, a potential carcinogen",
    regulatoryStatus: "FDA approved with different classifications (I-IV)",
    dailyLimit: "Varies by type",
    alternativesRisk: "Moderate, depends on manufacturing process"
  },
  // Adding alcohol and related compounds
  "alcohol": {
    description: "Psychoactive substance found in alcoholic beverages that affects the central nervous system.",
    category: "psychoactive substance",
    concern: "high",
    shortTermEffects: "Impaired judgment, coordination, and reflexes; nausea; vomiting; dehydration; intoxication",
    longTermEffects: "Liver damage, cardiovascular disease, increased cancer risk, dependency and addiction, brain damage",
    regulatoryStatus: "Legal but regulated, restricted for those under 21 in the US",
    dailyLimit: "If consumed: no more than 1 drink/day for women, 2 drinks/day for men (CDC)",
    alternativesRisk: "Very high, especially with regular consumption"
  },
  "ethanol": {
    description: "The primary type of alcohol in alcoholic beverages.",
    category: "psychoactive substance",
    concern: "high",
    shortTermEffects: "Same as alcohol: impaired cognition, slowed reflexes, intoxication",
    longTermEffects: "Liver cirrhosis, neurological damage, addiction, increased risk of multiple cancers",
    regulatoryStatus: "Legal in beverages but regulated, industrial forms restricted",
    dailyLimit: "If consumed: no more than 1 drink/day for women, 2 drinks/day for men (CDC)",
    alternativesRisk: "Very high, especially with regular consumption"
  },
  "ethyl alcohol": {
    description: "Another name for ethanol, the alcohol found in alcoholic beverages.",
    category: "psychoactive substance",
    concern: "high",
    shortTermEffects: "Same as alcohol and ethanol",
    longTermEffects: "Same as alcohol and ethanol",
    regulatoryStatus: "Legal but regulated",
    dailyLimit: "If consumed: no more than 1 drink/day for women, 2 drinks/day for men (CDC)",
    alternativesRisk: "Very high, especially with regular consumption"
  },
  "wine": {
    description: "Alcoholic beverage made from fermented grapes containing ethanol.",
    category: "alcoholic beverage",
    concern: "high",
    shortTermEffects: "Intoxication, impaired judgment, hangover",
    longTermEffects: "Liver damage, addiction, increased cancer risk, cardiovascular effects (both positive and negative)",
    regulatoryStatus: "Legal but regulated and age-restricted",
    dailyLimit: "If consumed: no more than 1 glass/day for women, 1-2 glasses/day for men",
    alternativesRisk: "High, despite some reported cardiovascular benefits from moderate consumption"
  },
  "beer": {
    description: "Alcoholic beverage made from fermented grains containing ethanol.",
    category: "alcoholic beverage",
    concern: "high",
    shortTermEffects: "Intoxication, impaired judgment, hangover",
    longTermEffects: "Liver damage, addiction, increased cancer risk, weight gain",
    regulatoryStatus: "Legal but regulated and age-restricted",
    dailyLimit: "If consumed: no more than 1 serving/day for women, 1-2 servings/day for men",
    alternativesRisk: "High with regular consumption"
  },
  "liquor": {
    description: "Distilled alcoholic beverage with high ethanol content.",
    category: "alcoholic beverage",
    concern: "high",
    shortTermEffects: "Rapid intoxication, severe impairment, increased risk of alcohol poisoning",
    longTermEffects: "Severe liver damage, addiction, increased cancer risk, neurological damage",
    regulatoryStatus: "Legal but regulated and age-restricted",
    dailyLimit: "If consumed: no more than 1 shot/day for women, 1-2 shots/day for men",
    alternativesRisk: "Very high due to concentrated alcohol content"
  },
  "spirits": {
    description: "Distilled alcoholic beverages with high ethanol content.",
    category: "alcoholic beverage",
    concern: "high",
    shortTermEffects: "Rapid intoxication, severe impairment, increased risk of alcohol poisoning",
    longTermEffects: "Severe liver damage, addiction, increased cancer risk, neurological damage",
    regulatoryStatus: "Legal but regulated and age-restricted",
    dailyLimit: "If consumed: no more than 1 serving/day for women, 1-2 servings/day for men",
    alternativesRisk: "Very high due to concentrated alcohol content"
  },
  "sulfites": {
    description: "Preservatives used in wine and food that can cause reactions in sensitive individuals.",
    category: "preservative",
    concern: "moderate",
    shortTermEffects: "Headaches, breathing problems in asthmatics, allergic reactions in sensitive individuals",
    longTermEffects: "Unknown long-term effects, primarily immediate sensitivity concerns",
    regulatoryStatus: "FDA approved but requires labeling on products containing >10ppm",
    dailyLimit: "ADI of 0.7 mg/kg body weight/day (WHO)",
    alternativesRisk: "Moderate, particularly for sensitive individuals and asthmatics"
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

  // Check for alcohol content
  const alcoholicIngredients = ingredientList.filter(ingredient => 
    ['alcohol', 'ethanol', 'ethyl alcohol', 'wine', 'beer', 'liquor', 'spirits'].some(term => 
      ingredient.includes(term)
    )
  );

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

  // Calculate health risk score (based on additives and their concern levels)
  const healthRiskScore = calculateHealthRiskScore(ingredientList, commonAdditives);

  // Show a toast notification if alcoholic ingredients are found
  React.useEffect(() => {
    if (alcoholicIngredients.length > 0) {
      toast({
        title: "Alcohol Alert",
        description: "This product contains alcohol which has significant health implications.",
        variant: "destructive",
      });
    }
  }, [alcoholicIngredients]);

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
            <TabsTrigger value="health">Health Impact</TabsTrigger>
            <TabsTrigger value="allergens">Allergens</TabsTrigger>
            <TabsTrigger value="additives">Additives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Nutrition Quality Score</h3>
                <div className="flex items-center mt-2">
                  <Progress 
                    value={nutritionScore} 
                    className="h-2" 
                    indicatorColor={nutritionScore > 70 ? 'bg-green-500' : nutritionScore > 40 ? 'bg-amber-500' : 'bg-red-500'}
                  />
                  <span className="ml-2 text-sm font-medium">{nutritionScore}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on the ratio of natural to processed ingredients
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Health Risk Assessment</h3>
                <div className="flex items-center mt-2">
                  <Progress 
                    value={healthRiskScore} 
                    className="h-2" 
                    indicatorColor={healthRiskScore < 30 ? 'bg-green-500' : healthRiskScore < 60 ? 'bg-amber-500' : 'bg-red-500'}
                  />
                  <span className="ml-2 text-sm font-medium">{healthRiskScore}%</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on presence of additives and their potential health impacts
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
                  {alcoholicIngredients.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm">Alcohol Content</span>
                      <span className="text-sm font-medium text-red-500 font-bold">Detected</span>
                    </div>
                  )}
                </div>
              </div>
              
              {alcoholicIngredients.length > 0 && (
                <>
                  <Separator />
                  <Alert variant="destructive" className="flex items-center">
                    <Wine className="h-4 w-4 mr-2" />
                    <AlertDescription>
                      <strong>Alcohol Warning:</strong> This product contains alcohol which may be harmful to your health, impair judgment, and is not suitable for pregnant women, those under the legal drinking age, or individuals with certain health conditions.
                    </AlertDescription>
                  </Alert>
                </>
              )}
              
              {foundAdditives.length > 0 && (
                <>
                  <Separator />
                  <Alert variant="warning">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Health Advisory:</strong> This product contains additives that may have adverse health effects with regular consumption. See the Health Impact tab for details.
                    </AlertDescription>
                  </Alert>
                </>
              )}
              
              {potentialAllergens.length > 0 && (
                <>
                  <Separator />
                  <Alert>
                    <ShieldAlert className="h-4 w-4" />
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
                  const isAlcoholic = ['alcohol', 'ethanol', 'ethyl alcohol', 'wine', 'beer', 'liquor', 'spirits'].some(term => 
                    ingredient.includes(term)
                  );
                  
                  // Determine concern level if it's an additive
                  let concernLevel = "low";
                  if (isAdditive || isAlcoholic) {
                    const matchedAdditive = Object.entries(commonAdditives).find(([key]) => 
                      ingredient.includes(key)
                    );
                    if (matchedAdditive) {
                      concernLevel = matchedAdditive[1].concern;
                    }
                  }
                  
                  return (
                    <li key={index} className="flex items-center p-2 border-b">
                      <span className="text-sm">{ingredient}</span>
                      <div className="ml-auto flex gap-2">
                        {isAllergen && <Badge variant="destructive">Allergen</Badge>}
                        {isAlcoholic && <Badge variant="destructive">Alcohol</Badge>}
                        {(isAdditive || isAlcoholic) && (
                          <Badge 
                            variant={
                              concernLevel === "high" ? "destructive" : 
                              concernLevel === "moderate" ? "outline" :
                              "secondary"
                            }
                          >
                            {concernLevel === "high" ? "High Risk" : 
                             concernLevel === "moderate" ? "Moderate Risk" : 
                             "Low Risk"}
                          </Badge>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="health">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Health Impact Assessment</h3>
              
              {alcoholicIngredients.length > 0 && (
                <Alert variant="destructive" className="mb-4">
                  <Skull className="h-4 w-4" />
                  <AlertDescription className="font-medium">
                    This product contains alcohol which has significant health implications:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Impaired judgment and coordination</li>
                      <li>Liver damage and potential liver disease with regular consumption</li>
                      <li>Increased risk of several types of cancer</li>
                      <li>Addiction and dependency concerns</li>
                      <li>Not suitable during pregnancy, while driving, or operating machinery</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              {(foundAdditives.length > 0 || alcoholicIngredients.length > 0) ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Below is an assessment of the potential health impacts of ingredients found in this product:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ingredient</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Short-term Effects</TableHead>
                          <TableHead>Long-term Effects</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Display alcoholic ingredients first */}
                        {alcoholicIngredients.map((additive, index) => {
                          const matchedAdditive = Object.entries(commonAdditives).find(([key]) => 
                            additive.includes(key)
                          );
                          
                          if (!matchedAdditive) return null;
                          const [key, info] = matchedAdditive;
                          
                          return (
                            <TableRow key={`alcohol-${index}`} className="bg-red-50 dark:bg-red-950/10">
                              <TableCell className="font-medium">{additive}</TableCell>
                              <TableCell>
                                <Badge variant="destructive">
                                  High
                                </Badge>
                              </TableCell>
                              <TableCell>{info.shortTermEffects}</TableCell>
                              <TableCell>{info.longTermEffects}</TableCell>
                            </TableRow>
                          );
                        })}
                        
                        {/* Then display other additives */}
                        {foundAdditives
                          .filter(additive => !alcoholicIngredients.includes(additive))
                          .map((additive, index) => {
                            const matchedAdditive = Object.entries(commonAdditives).find(([key]) => 
                              additive.includes(key)
                            );
                            
                            if (!matchedAdditive) return null;
                            const [key, info] = matchedAdditive;
                            
                            return (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{additive}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={
                                      info.concern === "high" ? "destructive" : 
                                      info.concern === "moderate" ? "outline" :
                                      "secondary"
                                    }
                                  >
                                    {info.concern === "high" ? "High" : 
                                     info.concern === "moderate" ? "Moderate" : 
                                     "Low"}
                                  </Badge>
                                </TableCell>
                                <TableCell>{info.shortTermEffects}</TableCell>
                                <TableCell>{info.longTermEffects}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium mb-2">Regulatory Information</h4>
                    <div className="space-y-3">
                      {(alcoholicIngredients.length > 0 ? alcoholicIngredients : [])
                        .concat(foundAdditives.filter(additive => !alcoholicIngredients.includes(additive)))
                        .map((additive, index) => {
                          const matchedAdditive = Object.entries(commonAdditives).find(([key]) => 
                            additive.includes(key)
                          );
                          
                          if (!matchedAdditive) return null;
                          const [key, info] = matchedAdditive;
                          
                          return (
                            <div key={index} className={`p-3 ${
                              ['alcohol', 'ethanol', 'ethyl alcohol', 'wine', 'beer', 'liquor', 'spirits'].some(term => 
                                additive.includes(term)
                              ) ? 'bg-red-50 dark:bg-red-950/20' : 'bg-gray-50 dark:bg-gray-800/50'
                            } rounded-md`}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{additive}</span>
                                <Badge variant="outline">{info.category}</Badge>
                              </div>
                              <p className="text-sm mt-1"><strong>Regulatory Status:</strong> {info.regulatoryStatus}</p>
                              <p className="text-sm mt-1"><strong>Recommended Limit:</strong> {info.dailyLimit}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  
                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900 mt-4">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This analysis is based on current scientific understanding and regulatory information. 
                      Individual responses to ingredients may vary, and research is ongoing for many substances.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No common additives or concerning ingredients with known health impacts were detected in the ingredients list.
                  This may indicate a product with minimal processed ingredients.
                </p>
              )}
              
              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Consumption Recommendations</h4>
                {alcoholicIngredients.length > 0 ? (
                  <Alert variant="destructive">
                    <HeartCrack className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Alcohol Warning:</strong> This product contains alcohol which should be consumed responsibly
                      and in moderation, if at all. Not recommended for pregnant women, individuals under the legal
                      drinking age, those with liver conditions, or when operating vehicles or machinery.
                    </AlertDescription>
                  </Alert>
                ) : healthRiskScore > 60 ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This product contains several high-concern additives. Consider limiting consumption 
                      or finding alternatives with fewer artificial ingredients.
                    </AlertDescription>
                  </Alert>
                ) : healthRiskScore > 30 ? (
                  <Alert variant="warning">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This product contains some concerning additives. Moderate consumption is advised, 
                      particularly for sensitive individuals or children.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="info" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This product appears to have minimal concerning additives. It is generally considered 
                      safer for regular consumption compared to alternatives with more additives.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
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

// Function to calculate health risk score based on additives and their concern levels
const calculateHealthRiskScore = (
  ingredientList: string[], 
  additiveDatabase: Record<string, { concern: string, category: string, [key: string]: any }>
): number => {
  // If there are no ingredients, return 0
  if (ingredientList.length === 0) return 0;
  
  let totalRiskScore = 0;
  let additiveCount = 0;
  
  // Analyze each ingredient for risk
  ingredientList.forEach(ingredient => {
    const matchedAdditive = Object.entries(additiveDatabase).find(([key]) => 
      ingredient.includes(key)
    );
    
    if (matchedAdditive) {
      const [key, info] = matchedAdditive;
      additiveCount++;
      
      // Assign risk scores based on concern level
      switch (info.concern) {
        case "high":
          totalRiskScore += 100;
          break;
        case "moderate":
          totalRiskScore += 50;
          break;
        case "low":
          totalRiskScore += 20;
          break;
        default:
          totalRiskScore += 0;
      }
      
      // Add additional risk for certain categories
      if (info.category === "preservative" || info.category === "color") {
        totalRiskScore += 10;
      }
      
      // Add extra risk for alcoholic substances
      if (info.category === "alcoholic beverage" || info.category === "psychoactive substance") {
        totalRiskScore += 50;
      }
    }
  });
  
  // If no additives were found, return minimum risk
  if (additiveCount === 0) return 0;
  
  // Calculate average risk per additive, then scale to 0-100
  const averageRisk = totalRiskScore / additiveCount;
  // Cap the score at 100
  return Math.min(Math.round(averageRisk), 100);
};

export default IngredientAnalysis;
