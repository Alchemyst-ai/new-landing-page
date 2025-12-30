import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { detailedCategories } from "@/lib/data";

export function ComparisonTable() {
  return (
    <div className="space-y-8">
      {detailedCategories.map((category) => (
        <Card key={category.category} className="overflow-hidden border-border/50 bg-card/30">
          <CardHeader className="bg-muted/20 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium tracking-tight">
                {category.category}
              </CardTitle>
              <Badge variant="outline" className="text-muted-foreground">
                n={category.count}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[40%]">Model</TableHead>
                  <TableHead className="text-right">Price (USD/1K)</TableHead>
                  <TableHead className="text-right">Performance (F1)</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.benchmarks
                  .sort((a, b) => b.performance - a.performance) // Sort by performance descending
                  .map((bench) => (
                  <TableRow key={bench.name} className={`hover:bg-muted/50 ${bench.highlight ? "bg-primary/5" : ""}`}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {bench.name}
                        {bench.highlight && (
                          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-0 text-[10px] h-5 px-1.5">
                            Our Model
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      ${bench.price.toFixed(4)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span className={bench.highlight ? "text-primary font-bold" : ""}>
                        {bench.performance.toFixed(3)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                       {/* Simple visual indicator of performance */}
                       <div className="flex justify-end gap-1">
                          {Array.from({ length: Math.round(bench.performance * 5) }).map((_, i) => (
                            <div key={i} className={`w-1.5 h-3 rounded-sm ${bench.highlight ? "bg-primary" : "bg-muted-foreground/30"}`} />
                          ))}
                          {Array.from({ length: 5 - Math.round(bench.performance * 5) }).map((_, i) => (
                            <div key={i} className="w-1.5 h-3 rounded-sm bg-muted/20" />
                          ))}
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
