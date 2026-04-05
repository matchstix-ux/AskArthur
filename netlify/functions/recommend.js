// ---------------------------------------------------------------------------
// Cigar database — 250 cigars
// 184 original + 66 new (34 Famous Smoke Shop exclusives = 52% of new additions)
// Sources: Famous Smoke Shop exclusive lines, Cigar Advisor reviews,
//          Famous-smoke.com product pages, top-rated premium selections
// data/cigars.json is the source of truth — inlined here for Lambda.
// ---------------------------------------------------------------------------
const ALL_CIGARS = [
  {"name":"Padron 1964 Anniversary Maduro","brand":"Padron","strength":8,"priceRange":"$15-$20","flavorNotes":["Cocoa","Espresso","Earth"]},
  {"name":"Oliva Serie V Melanio","brand":"Oliva","strength":7,"priceRange":"$12-$18","flavorNotes":["Cedar","Spice","Chocolate"]},
  {"name":"EP Carrillo Encore","brand":"EP Carrillo","strength":6,"priceRange":"$11-$16","flavorNotes":["Caramel","Cedar","Earth"]},
  {"name":"My Father Le Bijou 1922","brand":"My Father","strength":8,"priceRange":"$10-$15","flavorNotes":["Pepper","Espresso","Cocoa"]},
  {"name":"Drew Estate Liga Privada No. 9","brand":"Drew Estate","strength":8,"priceRange":"$14-$18","flavorNotes":["Coffee","Cocoa","Spice"]},
  {"name":"Arturo Fuente Hemingway","brand":"Arturo Fuente","strength":5,"priceRange":"$8-$14","flavorNotes":["Cedar","Sweetness","Spice"]},
  {"name":"Romeo y Julieta Reserva Real Nicaragua","brand":"Romeo y Julieta","strength":6,"priceRange":"$8-$11","flavorNotes":["Hazelnut","Spice","Earth"]},
  {"name":"Perdomo 20th Anniversary Sun Grown","brand":"Perdomo","strength":7,"priceRange":"$10-$14","flavorNotes":["Spice","Oak","Coffee"]},
  {"name":"Alec Bradley Prensado","brand":"Alec Bradley","strength":7,"priceRange":"$10-$13","flavorNotes":["Leather","Cocoa","Pepper"]},
  {"name":"La Aroma de Cuba Mi Amor","brand":"La Aroma de Cuba","strength":6,"priceRange":"$9-$12","flavorNotes":["Cocoa","Espresso","Earth"]},
  {"name":"Rocky Patel Decade","brand":"Rocky Patel","strength":7,"priceRange":"$10-$14","flavorNotes":["Cedar","Spice","Nuts"]},
  {"name":"Montecristo Epic","brand":"Montecristo","strength":6,"priceRange":"$12-$18","flavorNotes":["Cocoa","Nuts","Cedar"]},
  {"name":"San Cristobal Revelation","brand":"San Cristobal","strength":6,"priceRange":"$9-$13","flavorNotes":["Cocoa","Leather","Spice"]},
  {"name":"Aging Room Quattro Nicaragua","brand":"Aging Room","strength":7,"priceRange":"$10-$13","flavorNotes":["Chocolate","Coffee","Pepper"]},
  {"name":"Ashton Symmetry","brand":"Ashton","strength":6,"priceRange":"$11-$15","flavorNotes":["Cedar","Spice","Cream"]},
  {"name":"La Flor Dominicana Double Ligero","brand":"La Flor Dominicana","strength":9,"priceRange":"$9-$13","flavorNotes":["Spice","Earth","Pepper"]},
  {"name":"Camacho Corojo","brand":"Camacho","strength":7,"priceRange":"$8-$12","flavorNotes":["Spice","Leather","Earth"]},
  {"name":"H. Upmann by AJ Fernandez","brand":"H. Upmann","strength":6,"priceRange":"$7-$10","flavorNotes":["Spice","Nuts","Cocoa"]},
  {"name":"Joya de Nicaragua Antano 1970","brand":"Joya de Nicaragua","strength":9,"priceRange":"$7-$12","flavorNotes":["Pepper","Earth","Leather"]},
  {"name":"Crowned Heads Mil Dias","brand":"Crowned Heads","strength":6,"priceRange":"$10-$13","flavorNotes":["Cream","Spice","Cedar"]},
  {"name":"Diesel Unholy Cocktail","brand":"Diesel","strength":8,"priceRange":"$6-$9","flavorNotes":["Earth","Spice","Leather"]},
  {"name":"CAO Flathead V660","brand":"CAO","strength":7,"priceRange":"$8-$12","flavorNotes":["Chocolate","Espresso","Pepper"]},
  {"name":"Oliva Serie O","brand":"Oliva","strength":6,"priceRange":"$6-$10","flavorNotes":["Cedar","Spice","Sweetness"]},
  {"name":"Nub Connecticut","brand":"Nub","strength":4,"priceRange":"$6-$8","flavorNotes":["Cream","Cedar","Nuts"]},
  {"name":"Punch Gran Puro Nicaragua","brand":"Punch","strength":8,"priceRange":"$7-$11","flavorNotes":["Spice","Earth","Cedar"]},
  {"name":"Tatuaje Havana VI","brand":"Tatuaje","strength":6,"priceRange":"$8-$11","flavorNotes":["Pepper","Cedar","Earth"]},
  {"name":"Flor de las Antillas","brand":"My Father","strength":6,"priceRange":"$7-$10","flavorNotes":["Cedar","Nutmeg","Sweetness"]},
  {"name":"Warped La Colmena No. 44","brand":"Warped","strength":5,"priceRange":"$14-$17","flavorNotes":["Honey","Floral","Cream"]},
  {"name":"Illusione Epernay","brand":"Illusione","strength":5,"priceRange":"$11-$14","flavorNotes":["Coffee","Cedar","Sweetness"]},
  {"name":"Foundation The Tabernacle","brand":"Foundation","strength":8,"priceRange":"$12-$16","flavorNotes":["Earth","Cocoa","Spice"]},
  {"name":"RoMa Craft CroMagnon","brand":"RoMa Craft","strength":8,"priceRange":"$9-$12","flavorNotes":["Earth","Pepper","Leather"]},
  {"name":"Dunbarton Mi Querida","brand":"Dunbarton Tobacco & Trust","strength":8,"priceRange":"$10-$13","flavorNotes":["Cocoa","Earth","Pepper"]},
  {"name":"Black Label Trading Co. Lawless","brand":"Black Label Trading Co.","strength":7,"priceRange":"$10-$12","flavorNotes":["Chocolate","Spice","Earth"]},
  {"name":"Southern Draw Kudzu","brand":"Southern Draw","strength":7,"priceRange":"$9-$12","flavorNotes":["Cedar","Sweetness","Spice"]},
  {"name":"Espinosa Laranja Reserva","brand":"Espinosa","strength":7,"priceRange":"$10-$13","flavorNotes":["Orange","Spice","Earth"]},
  {"name":"JRE Aladino Corojo","brand":"JRE Tobacco","strength":7,"priceRange":"$8-$11","flavorNotes":["Cedar","Nuts","Spice"]},
  {"name":"Plasencia Alma Fuerte","brand":"Plasencia","strength":8,"priceRange":"$18-$22","flavorNotes":["Earth","Chocolate","Coffee"]},
  {"name":"Patina Habano","brand":"Patina","strength":6,"priceRange":"$9-$12","flavorNotes":["Cream","Cedar","Nuts"]},
  {"name":"Fratello Classico","brand":"Fratello","strength":6,"priceRange":"$7-$10","flavorNotes":["Cedar","Pepper","Sweetness"]},
  {"name":"Pichardo Reserva Familiar","brand":"Pichardo","strength":6,"priceRange":"$10-$13","flavorNotes":["Coffee","Earth","Spice"]},
  {"name":"Cavalier Geneve White Series","brand":"Cavalier Geneve","strength":5,"priceRange":"$11-$14","flavorNotes":["Cream","Honey","Cedar"]},
  {"name":"Sin Compromiso","brand":"Dunbarton Tobacco & Trust","strength":7,"priceRange":"$17-$20","flavorNotes":["Chocolate","Spice","Earth"]},
  {"name":"Joya de Nicaragua Antano CT","brand":"Joya de Nicaragua","strength":6,"priceRange":"$8-$11","flavorNotes":["Cream","Pepper","Earth"]},
  {"name":"Villiger La Flor de Ynclan","brand":"Villiger","strength":6,"priceRange":"$11-$14","flavorNotes":["Cedar","Sweetness","Spice"]},
  {"name":"El Gueguense (Wise Man)","brand":"Foundation","strength":7,"priceRange":"$11-$15","flavorNotes":["Cedar","Cocoa","Pepper"]},
  {"name":"Micallef Reserva","brand":"Micallef","strength":7,"priceRange":"$12-$15","flavorNotes":["Chocolate","Earth","Spice"]},
  {"name":"Cornelius & Anthony The Meridian","brand":"Cornelius & Anthony","strength":6,"priceRange":"$9-$12","flavorNotes":["Coffee","Cedar","Nuts"]},
  {"name":"Crowned Heads Four Kicks","brand":"Crowned Heads","strength":6,"priceRange":"$8-$11","flavorNotes":["Cedar","Spice","Sweetness"]},
  {"name":"Aganorsa Leaf Signature Selection","brand":"Aganorsa Leaf","strength":7,"priceRange":"$11-$14","flavorNotes":["Cream","Cedar","Spice"]},
  {"name":"Casa Fernandez Miami Reserva","brand":"Casa Fernandez","strength":7,"priceRange":"$10-$13","flavorNotes":["Nuts","Spice","Earth"]},
  {"name":"Illusione Rothchildes","brand":"Illusione","strength":6,"priceRange":"$6-$9","flavorNotes":["Pepper","Cedar","Sweetness"]},
  {"name":"Room101 Farce","brand":"Room101","strength":6,"priceRange":"$9-$13","flavorNotes":["Cream","Earth","Spice"]},
  {"name":"Warped Cloud Hopper","brand":"Warped","strength":5,"priceRange":"$7-$10","flavorNotes":["Bread","Cream","Spice"]},
  {"name":"RoMa Craft Neanderthal","brand":"RoMa Craft","strength":10,"priceRange":"$13-$16","flavorNotes":["Pepper","Earth","Chocolate"]},
  {"name":"Southern Draw Firethorn","brand":"Southern Draw","strength":6,"priceRange":"$8-$11","flavorNotes":["Sweetness","Cedar","Spice"]},
  {"name":"Dapper Desvalido","brand":"Dapper","strength":7,"priceRange":"$11-$14","flavorNotes":["Cedar","Earth","Pepper"]},
  {"name":"Espinosa Habano","brand":"Espinosa","strength":6,"priceRange":"$7-$10","flavorNotes":["Spice","Earth","Cedar"]},
  {"name":"JRE Aladino Cameroon","brand":"JRE Tobacco","strength":6,"priceRange":"$8-$11","flavorNotes":["Sweetness","Spice","Cedar"]},
  {"name":"Crowned Heads Las Calaveras","brand":"Crowned Heads","strength":7,"priceRange":"$11-$15","flavorNotes":["Cedar","Sweetness","Pepper"]},
  {"name":"Plasencia Alma del Fuego","brand":"Plasencia","strength":8,"priceRange":"$15-$19","flavorNotes":["Earth","Pepper","Chocolate"]},
  {"name":"Foundation Charter Oak Habano","brand":"Foundation","strength":5,"priceRange":"$5-$8","flavorNotes":["Nuts","Cedar","Cream"]},
  {"name":"Aganorsa Leaf Guardian of the Farm","brand":"Aganorsa Leaf","strength":6,"priceRange":"$8-$11","flavorNotes":["Cedar","Nuts","Pepper"]},
  {"name":"Black Works Studio Killer Bee","brand":"Black Works Studio","strength":7,"priceRange":"$8-$11","flavorNotes":["Spice","Earth","Chocolate"]},
  {"name":"Cavalier Geneve Black Series II","brand":"Cavalier Geneve","strength":7,"priceRange":"$12-$16","flavorNotes":["Cocoa","Spice","Earth"]},
  {"name":"Micallef Leyenda","brand":"Micallef","strength":6,"priceRange":"$10-$13","flavorNotes":["Cream","Spice","Nuts"]},
  {"name":"Pichardo Clasico","brand":"Pichardo","strength":5,"priceRange":"$8-$11","flavorNotes":["Cedar","Earth","Sweetness"]},
  {"name":"Casa Fernandez Aganorsa Leaf Maduro","brand":"Casa Fernandez","strength":8,"priceRange":"$11-$14","flavorNotes":["Chocolate","Pepper","Earth"]},
  {"name":"La Barba Red","brand":"La Barba","strength":6,"priceRange":"$8-$11","flavorNotes":["Pepper","Cedar","Sweetness"]},
  {"name":"Room101 Doomsayer","brand":"Room101","strength":7,"priceRange":"$8-$12","flavorNotes":["Earth","Pepper","Chocolate"]},
  {"name":"Warped Serie Gran Reserva 1988","brand":"Warped","strength":6,"priceRange":"$9-$13","flavorNotes":["Bread","Nuts","Cream"]},
  {"name":"Dunbarton Sobremesa Brulee","brand":"Dunbarton Tobacco & Trust","strength":4,"priceRange":"$11-$15","flavorNotes":["Cream","Sweetness","Cedar"]},
  {"name":"Black Label Trading Co. Bishop’s Blend","brand":"Black Label Trading Co.","strength":8,"priceRange":"$12-$15","flavorNotes":["Pepper","Earth","Spice"]},
  {"name":"Alec Bradley Black Market Esteli","brand":"Alec Bradley","strength":7,"priceRange":"$8-$12","flavorNotes":["Pepper","Earth","Cedar"]},
  {"name":"Patina Maduro","brand":"Patina","strength":7,"priceRange":"$10-$14","flavorNotes":["Chocolate","Earth","Spice"]},
  {"name":"Joya de Nicaragua Joya Black","brand":"Joya de Nicaragua","strength":7,"priceRange":"$7-$11","flavorNotes":["Pepper","Cedar","Earth"]},
  {"name":"Cornelius & Anthony Venganza","brand":"Cornelius & Anthony","strength":8,"priceRange":"$10-$14","flavorNotes":["Pepper","Cedar","Chocolate"]},
  {"name":"La Flor Dominicana La Nox","brand":"La Flor Dominicana","strength":8,"priceRange":"$13-$16","flavorNotes":["Chocolate","Earth","Spice"]},
  {"name":"Illusione Ultra","brand":"Illusione","strength":8,"priceRange":"$11-$14","flavorNotes":["Pepper","Earth","Coffee"]},
  {"name":"Aganorsa Leaf Lunatic Torch","brand":"Aganorsa Leaf","strength":8,"priceRange":"$10-$14","flavorNotes":["Pepper","Earth","Sweetness"]},
  {"name":"My Father The Judge Grand Robusto","brand":"My Father","strength":8,"priceRange":"$13-$18","flavorNotes":["Earth","Toast","Wood","Nuts","Sweetness"]},
  {"name":"Montecristo 1935 Anniversary Nicaragua Espeso","brand":"Montecristo","strength":7,"priceRange":"$16-$22","flavorNotes":["Cocoa","Roasted Nuts","Spice","Oak"]},
  {"name":"EP Carrillo Encore Celestial","brand":"EP Carrillo","strength":6,"priceRange":"$12-$17","flavorNotes":["Earth","Wood","Cream","Spice"]},
  {"name":"Padrón Serie 1926 No. 6","brand":"Padron","strength":8,"priceRange":"$25-$32","flavorNotes":["Cocoa","Coffee","Earth","Leather"]},
  {"name":"Rocky Patel Conviction Toro","brand":"Rocky Patel","strength":8,"priceRange":"$95-$105","flavorNotes":["Cocoa","Dark Chocolate","Coffee","Pepper","Leather"]},
  {"name":"Oliva Serie V Melanio Maduro Torpedo","brand":"Oliva","strength":8,"priceRange":"$14-$19","flavorNotes":["Dark Chocolate","Espresso","Cinnamon","Pepper","Cream"]},
  {"name":"Brick House Churchill","brand":"Brick House","strength":7,"priceRange":"$7-$10","flavorNotes":["Wood","Leather","Nuts","Spice","Coffee"]},
  {"name":"La Aroma de Cuba Pasión Torpedo","brand":"La Aroma de Cuba","strength":7,"priceRange":"$10-$14","flavorNotes":["Earth","Pepper","Leather","Coffee","Sweetness"]},
  {"name":"Herrera Esteli Norteño Lonsdale","brand":"Herrera Esteli","strength":8,"priceRange":"$10-$13","flavorNotes":["Dark Chocolate","Espresso","Earth","Spice","Sweetness"]},
  {"name":"Cohiba Riviera Robusto","brand":"Cohiba","strength":7,"priceRange":"$12-$16","flavorNotes":["Leather","Pepper","Coffee","Chocolate","Earth"]},
  {"name":"La Flor Dominicana Double Ligero Chiselito Maduro","brand":"La Flor Dominicana","strength":9,"priceRange":"$12-$16","flavorNotes":["Dark Chocolate","Espresso","Pepper","Molasses","Earth"]},
  {"name":"601 La Bomba Warhead X","brand":"601","strength":9,"priceRange":"$14-$18","flavorNotes":["Pepper","Earth","Dark Chocolate","Espresso","Sweetness"]},
  {"name":"Tatuaje Reserva A Uno","brand":"Tatuaje","strength":8,"priceRange":"$14-$18","flavorNotes":["Dark Chocolate","Espresso","Leather","Pepper","Earth"]},
  {"name":"Ferio Tego Summa Corona Gorda","brand":"Ferio Tego","strength":6,"priceRange":"$11-$15","flavorNotes":["Cedar","Almonds","Caramel","Pepper"]},
  {"name":"Warped Corto X52","brand":"Warped","strength":6,"priceRange":"$12-$16","flavorNotes":["Cedar","Cream","Nuts","Sweetness"]},
  {"name":"Perdomo 30th Anniversary Sun Grown Epicure","brand":"Perdomo","strength":7,"priceRange":"$12-$16","flavorNotes":["Earth","Pepper","Leather","Coffee","Dark Chocolate"]},
  {"name":"Plasencia Cosecha 151 La Musica","brand":"Plasencia","strength":8,"priceRange":"$14-$18","flavorNotes":["Pepper","Coffee","Cocoa","Earth","Sweetness"]},
  {"name":"OneOff Black & Tan Robusto","brand":"OneOff","strength":7,"priceRange":"$11-$14","flavorNotes":["Earth","Pepper","Leather","Spice"]},
  {"name":"Arturo Fuente Don Carlos Eye of the Bull","brand":"Arturo Fuente","strength":7,"priceRange":"$18-$24","flavorNotes":["Cedar","Almonds","Leather","Earth","Cream"]},
  {"name":"Fuente OpusX Reserva d'Chateau","brand":"Arturo Fuente","strength":9,"priceRange":"$35-$50","flavorNotes":["Pepper","Leather","Dark Fruit","Earth","Coffee"]},
  {"name":"Padrón Serie 1926 No. 48 Maduro","brand":"Padron","strength":8,"priceRange":"$25-$32","flavorNotes":["Cocoa","Espresso","Earth","Sweetness"]},
  {"name":"Rocky Patel ALR Second Edition Toro","brand":"Rocky Patel","strength":7,"priceRange":"$14-$18","flavorNotes":["Cedar","Coffee","Earth","Spice","Leather"]},
  {"name":"Blackened M81 Corona","brand":"Blackened","strength":7,"priceRange":"$10-$13","flavorNotes":["Cream","Chocolate","Sweetness","Spice","Earth"]},
  {"name":"Alec Bradley Prensado Torpedo","brand":"Alec Bradley","strength":7,"priceRange":"$10-$14","flavorNotes":["Cocoa","Cedar","Pepper","Leather","Spice"]},
  {"name":"Ashton Virgin Sun Grown Illusion","brand":"Ashton","strength":7,"priceRange":"$14-$18","flavorNotes":["Pepper","Earth","Cedar","Leather","Spice"]},
  {"name":"West Tampa Red Robusto","brand":"West Tampa","strength":7,"priceRange":"$8-$11","flavorNotes":["Pepper","Cedar","Earth","Leather"]},
  {"name":"Long Live The Queen Ace of Hearts","brand":"Long Live The Queen","strength":7,"priceRange":"$11-$14","flavorNotes":["Cream","Cedar","Spice","Sweetness"]},
  {"name":"Punch Dad's Home Movies Toro","brand":"Punch","strength":7,"priceRange":"$9-$12","flavorNotes":["Spice","Coffee","Earth","Nuts","Pepper"]},
  {"name":"Crux Epicure Habano Toro","brand":"Crux","strength":6,"priceRange":"$11-$15","flavorNotes":["Cinnamon","Leather","Coffee","Earth","Cedar"]},
  {"name":"Espinosa Sumatra Robusto","brand":"Espinosa","strength":6,"priceRange":"$9-$13","flavorNotes":["Nuts","Spice","Cream","Dark Chocolate"]},
  {"name":"Blackened S84 Toro","brand":"Blackened","strength":8,"priceRange":"$10-$13","flavorNotes":["Cinnamon","Cream","Spice","Leather","Dark Chocolate"]},
  {"name":"H. Upmann 180th Anniversary","brand":"H. Upmann","strength":7,"priceRange":"$14-$19","flavorNotes":["Pepper","Oak","Leather","Sweetness"]},
  {"name":"Camacho Broadleaf Gordo","brand":"Camacho","strength":7,"priceRange":"$10-$14","flavorNotes":["Chocolate","Earth","Cinnamon","Sweetness"]},
  {"name":"Oliva Serie V Double Robusto","brand":"Oliva","strength":7,"priceRange":"$12-$16","flavorNotes":["Pepper","Earth","Coffee","Leather"]},
  {"name":"Liga Privada H99 Toro","brand":"Drew Estate","strength":9,"priceRange":"$18-$22","flavorNotes":["Dark Chocolate","Sweetness","Earth","Pepper","Coffee"]},
  {"name":"The Wise Man Maduro Toro","brand":"Foundation","strength":7,"priceRange":"$10-$14","flavorNotes":["Cocoa","Earth","Pepper","Leather","Cedar"]},
  {"name":"Tatuaje Cojonu Broadleaf","brand":"Tatuaje","strength":7,"priceRange":"$10-$14","flavorNotes":["Dark Chocolate","Leather","Earth","Spice"]},
  {"name":"Crowned Heads Blood Medicine Toro","brand":"Crowned Heads","strength":8,"priceRange":"$14-$18","flavorNotes":["Sweetness","Leather","Cedar","Spice"]},
  {"name":"EP Carrillo Essence Robusto Maduro","brand":"EP Carrillo","strength":6,"priceRange":"$8-$11","flavorNotes":["Earth","Chocolate","Espresso","Pepper","Cream"]},
  {"name":"Umbagog Bronzeback","brand":"Dunbarton Tobacco & Trust","strength":7,"priceRange":"$12-$16","flavorNotes":["Cream","Chocolate","Pepper","Leather"]},
  {"name":"Aganorsa Rare Leaf Reserve Robusto","brand":"Aganorsa Leaf","strength":6,"priceRange":"$10-$14","flavorNotes":["Earth","Cinnamon","Cocoa","Leather"]},
  {"name":"Crowned Heads Mil Dias Maduro Robusto","brand":"Crowned Heads","strength":6,"priceRange":"$12-$15","flavorNotes":["Cocoa","Nuts","Leather","Cream"]},
  {"name":"Kristoff Tres Compadres Toro","brand":"Kristoff","strength":5,"priceRange":"$10-$14","flavorNotes":["Cream","Bread","Wood","Nuts","Pepper"]},
  {"name":"Hoyo de Monterrey Double Corona","brand":"Hoyo de Monterrey","strength":7,"priceRange":"$9-$13","flavorNotes":["Earth","Cedar","Spice","Leather"]},
  {"name":"Oliva Cain F Lancero","brand":"Oliva","strength":9,"priceRange":"$9-$13","flavorNotes":["Coffee","Pepper","Wood","Earth"]},
  {"name":"Arturo Fuente Don Carlos Robusto","brand":"Arturo Fuente","strength":7,"priceRange":"$16-$22","flavorNotes":["Cedar","Almonds","Cream","Spice","Earth"]},
  {"name":"Aging Room Quattro Nicaragua Maestro","brand":"Aging Room","strength":7,"priceRange":"$11-$15","flavorNotes":["Dark Chocolate","Spice","Earth","Coffee"]},
  {"name":"EP Carrillo Pledge Prequel","brand":"EP Carrillo","strength":7,"priceRange":"$10-$14","flavorNotes":["Espresso","Pepper","Sweetness","Earth"]},
  {"name":"Macanudo Inspirado Orange Gigante","brand":"Macanudo","strength":7,"priceRange":"$10-$13","flavorNotes":["Cedar","Citrus","Spice","Sweetness"]},
  {"name":"Davidoff Year of the Rabbit","brand":"Davidoff","strength":6,"priceRange":"$22-$28","flavorNotes":["Cedar","Cream","Nuts","Floral"]},
  {"name":"Padrón Family Reserve No. 44","brand":"Padron","strength":8,"priceRange":"$30-$38","flavorNotes":["Cocoa","Coffee","Earth","Oak","Leather"]},
  {"name":"Perdomo Habano Bourbon Barrel-Aged Toro","brand":"Perdomo","strength":7,"priceRange":"$9-$13","flavorNotes":["Oak","Sweetness","Vanilla","Coffee","Cedar"]},
  {"name":"CAO Oriente Toro","brand":"CAO","strength":7,"priceRange":"$8-$12","flavorNotes":["Earth","Leather","Spice","Coffee"]},
  {"name":"Alec Bradley Black Market Robusto","brand":"Alec Bradley","strength":8,"priceRange":"$9-$13","flavorNotes":["Pepper","Dark Chocolate","Earth","Leather"]},
  {"name":"Rocky Patel Edge Torpedo","brand":"Rocky Patel","strength":8,"priceRange":"$8-$12","flavorNotes":["Pepper","Earth","Leather","Coffee"]},
  {"name":"Rocky Patel Fifteenth Anniversary Toro","brand":"Rocky Patel","strength":6,"priceRange":"$12-$16","flavorNotes":["Cedar","Cream","Nuts","Spice"]},
  {"name":"Aganorsa Leaf Supreme Leaf Toro","brand":"Aganorsa Leaf","strength":7,"priceRange":"$11-$15","flavorNotes":["Earth","Cedar","Spice","Cream"]},
  {"name":"Crowned Heads La Vereda Robusto","brand":"Crowned Heads","strength":6,"priceRange":"$9-$12","flavorNotes":["Cedar","Sweetness","Cream","Spice"]},
  {"name":"Davidoff Aniversario Special R","brand":"Davidoff","strength":6,"priceRange":"$28-$35","flavorNotes":["Cedar","Floral","Cream","Nuts"]},
  {"name":"Ashton VSG Torpedo","brand":"Ashton","strength":9,"priceRange":"$18-$24","flavorNotes":["Pepper","Earth","Wood","Spice","Leather"]},
  {"name":"Acid Blue Kuba Kuba","brand":"Drew Estate","strength":5,"priceRange":"$9-$12","flavorNotes":["Floral","Sweetness","Spice","Cream"]},
  {"name":"General Cigar Macanudo Inspirado Black Toro","brand":"Macanudo","strength":8,"priceRange":"$9-$12","flavorNotes":["Earth","Pepper","Leather","Spice"]},
  {"name":"Oliva Master Blends 3 Robusto","brand":"Oliva","strength":7,"priceRange":"$9-$12","flavorNotes":["Cedar","Spice","Coffee","Earth"]},
  {"name":"My Father Flor de las Antillas Toro","brand":"My Father","strength":7,"priceRange":"$8-$11","flavorNotes":["Cedar","Sweetness","Cream","Spice"]},
  {"name":"Padrón 3000 Maduro","brand":"Padron","strength":7,"priceRange":"$7-$10","flavorNotes":["Cocoa","Earth","Coffee","Sweetness"]},
  {"name":"Padrón 2000 Natural","brand":"Padron","strength":6,"priceRange":"$6-$9","flavorNotes":["Cedar","Earth","Nuts","Spice"]},
  {"name":"General Cigar Punch Signature Robusto","brand":"Punch","strength":6,"priceRange":"$5-$8","flavorNotes":["Earth","Cedar","Spice","Cream"]},
  {"name":"E.P. Carrillo Short Run 2024 Toro","brand":"EP Carrillo","strength":7,"priceRange":"$12-$16","flavorNotes":["Cinnamon","Leather","Cedar","Coffee","Sweetness"]},
  {"name":"Black Works Studio Holy Lance Lancero","brand":"Black Works Studio","strength":8,"priceRange":"$12-$16","flavorNotes":["Pepper","Earth","Chocolate","Leather"]},
  {"name":"Liga Privada Unico Serie L40","brand":"Drew Estate","strength":8,"priceRange":"$22-$28","flavorNotes":["Dark Chocolate","Earth","Espresso","Spice","Leather"]},
  {"name":"Nestor Miranda Grand Reserve Torpedo","brand":"Miami Cigar","strength":6,"priceRange":"$10-$14","flavorNotes":["Cream","Pepper","Nuts","Chocolate","Honey"]},
  {"name":"Davidoff Winston Churchill Robusto","brand":"Davidoff","strength":7,"priceRange":"$18-$24","flavorNotes":["Leather","Oak","Spice","Cream","Sweetness"]},
  {"name":"Montecristo 1935 Anniversary Edición Diamante","brand":"Montecristo","strength":7,"priceRange":"$16-$22","flavorNotes":["Cocoa","Nuts","Cedar","Spice"]},
  {"name":"Camacho Triple Maduro Robusto","brand":"Camacho","strength":9,"priceRange":"$9-$13","flavorNotes":["Dark Chocolate","Coffee","Earth","Pepper","Sweetness"]},
  {"name":"Alec Bradley Tempus Robusto","brand":"Alec Bradley","strength":8,"priceRange":"$9-$13","flavorNotes":["Earth","Cocoa","Pepper","Leather","Cedar"]},
  {"name":"Foundation Wise Man Habano Robusto","brand":"Foundation","strength":7,"priceRange":"$9-$12","flavorNotes":["Cedar","Cinnamon","Earth","Cocoa"]},
  {"name":"RoMa Craft Intemperance Toro","brand":"RoMa Craft","strength":7,"priceRange":"$11-$15","flavorNotes":["Earth","Leather","Cedar","Pepper"]},
  {"name":"Joya de Nicaragua Cinco de Cinco Robusto","brand":"Joya de Nicaragua","strength":8,"priceRange":"$14-$18","flavorNotes":["Pepper","Earth","Coffee","Leather","Cocoa"]},
  {"name":"La Flor Dominicana Andalusian Bull","brand":"La Flor Dominicana","strength":9,"priceRange":"$18-$24","flavorNotes":["Spice","Earth","Dark Chocolate","Pepper","Leather"]},
  {"name":"Drew Estate Undercrown Shade Toro","brand":"Drew Estate","strength":6,"priceRange":"$8-$11","flavorNotes":["Cream","Cedar","Earth","Spice"]},
  {"name":"Drew Estate Undercrown Maduro Corona Viva","brand":"Drew Estate","strength":8,"priceRange":"$8-$11","flavorNotes":["Dark Chocolate","Coffee","Earth","Spice"]},
  {"name":"Perdomo Lot 23 Robusto","brand":"Perdomo","strength":6,"priceRange":"$7-$10","flavorNotes":["Cedar","Coffee","Cream","Nuts"]},
  {"name":"Tabernacle Havana Seed Connecticut No. 52","brand":"Foundation","strength":6,"priceRange":"$9-$13","flavorNotes":["Cream","Cedar","Floral","Nuts","Spice"]},
  {"name":"Protocol White Tip Robusto","brand":"Cubariqueño","strength":6,"priceRange":"$8-$11","flavorNotes":["Cedar","Cream","Coffee","Earth"]},
  {"name":"Carlos Torano Exodus Gold 52 Torpedo","brand":"Carlos Torano","strength":7,"priceRange":"$8-$12","flavorNotes":["Leather","Cedar","Coffee","Earth","Pepper"]},
  {"name":"Room101 Farce Gold Line Robusto","brand":"Room101","strength":6,"priceRange":"$11-$15","flavorNotes":["Cream","Earth","Sweetness","Spice"]},
  {"name":"Plasencia Cosecha 149 Gordito","brand":"Plasencia","strength":7,"priceRange":"$11-$15","flavorNotes":["Earth","Pepper","Coffee","Spice"]},
  {"name":"Olmec Claro Corona Gorda","brand":"Olmec","strength":6,"priceRange":"$14-$18","flavorNotes":["Cream","Nuts","Cedar","Sweetness"]},
  {"name":"El Pulpo Belicoso Grande","brand":"El Pulpo","strength":8,"priceRange":"$12-$16","flavorNotes":["Earth","Pepper","Leather","Coffee","Spice"]},
  {"name":"La Palina 1948 Robusto","brand":"La Palina","strength":7,"priceRange":"$12-$16","flavorNotes":["Coffee","Cocoa","Earth","Cedar","Cream"]},
  {"name":"Davidoff Grand Cru No. 2","brand":"Davidoff","strength":5,"priceRange":"$20-$26","flavorNotes":["Cream","Cedar","Floral","Nuts","Sweetness"]},
  {"name":"Illusione Original Documents Habano","brand":"Illusione","strength":7,"priceRange":"$10-$14","flavorNotes":["Pepper","Cedar","Earth","Coffee"]},
  {"name":"E.P. Carrillo La Historia E-III","brand":"EP Carrillo","strength":8,"priceRange":"$14-$18","flavorNotes":["Dark Chocolate","Earth","Spice","Leather","Coffee"]},
  {"name":"Fuente Fuente OpusX Angel's Share","brand":"Arturo Fuente","strength":9,"priceRange":"$40-$55","flavorNotes":["Pepper","Leather","Dark Fruit","Espresso","Earth"]},
  {"name":"Avo Expressions Fogata","brand":"AVO","strength":6,"priceRange":"$14-$18","flavorNotes":["Cedar","Cream","Sweetness","Coffee"]},
  {"name":"HVC Hot Cake Golden Line Connecticut","brand":"HVC","strength":5,"priceRange":"$9-$12","flavorNotes":["Nuts","Cream","Cedar","Floral"]},
  {"name":"Oliva Serie G Robusto","brand":"Oliva","strength":6,"priceRange":"$6-$9","flavorNotes":["Cedar","Spice","Coffee","Sweetness"]},
  {"name":"Perdomo Reserve 10th Anniversary Robusto Maduro","brand":"Perdomo","strength":7,"priceRange":"$9-$13","flavorNotes":["Chocolate","Coffee","Earth","Sweetness"]},
  {"name":"Diesel Grind Robusto","brand":"Diesel","strength":7,"priceRange":"$8-$11","flavorNotes":["Earth","Spice","Coffee","Cedar"]},
  {"name":"Liga Privada T52 Robusto","brand":"Drew Estate","strength":8,"priceRange":"$12-$16","flavorNotes":["Dark Chocolate","Earth","Espresso","Spice"]},
  {"name":"Padrón 1926 Serie No. 35 Natural","brand":"Padron","strength":8,"priceRange":"$22-$28","flavorNotes":["Cocoa","Coffee","Earth","Leather","Nuts"]},
  {"name":"My Father No. 4 Robusto","brand":"My Father","strength":8,"priceRange":"$8-$12","flavorNotes":["Pepper","Earth","Cocoa","Leather","Spice"]},
  {"name":"Tatuaje Miami Havana VI Cazadores","brand":"Tatuaje","strength":7,"priceRange":"$8-$12","flavorNotes":["Pepper","Cedar","Earth","Leather","Spice"]},
  {"name":"Viva La Vida Jester","brand":"AJ Fernandez","strength":8,"priceRange":"$11-$15","flavorNotes":["Dark Chocolate","Pepper","Coffee","Earth","Leather"]},
  {"name":"Casa Magna Colorado XV Anniversary","brand":"Casa Magna","strength":8,"priceRange":"$14-$18","flavorNotes":["Leather","Cedar","Earth","Dark Chocolate","Coffee"]},
  {"name":"Famous Exclusives Cattivo Biondo Corona","brand":"Famous Exclusives","strength":4,"priceRange":"$2-$4","flavorNotes":["Cream","Cedar","Floral","Nuts"]},
  {"name":"Famous Exclusives Buenos Naturales Corona","brand":"Famous Exclusives","strength":5,"priceRange":"$2-$4","flavorNotes":["Earth","Cedar","Spice","Nuts"]},
  {"name":"Famous Exclusives Buenos Maduritos Corona","brand":"Famous Exclusives","strength":6,"priceRange":"$2-$4","flavorNotes":["Chocolate","Earth","Sweetness","Spice"]},
  {"name":"Famous Tucos Oscuros Toro","brand":"Famous Exclusives","strength":7,"priceRange":"$5-$8","flavorNotes":["Dark Chocolate","Earth","Pepper","Leather"]},
  {"name":"Famous Dominican 2000 Toro Habano","brand":"Famous Dominican","strength":6,"priceRange":"$5-$8","flavorNotes":["Cedar","Nuts","Spice","Earth","Cream"]},
  {"name":"Famous Dominican 2000 Toro San Andres","brand":"Famous Dominican","strength":7,"priceRange":"$5-$8","flavorNotes":["Dark Chocolate","Earth","Pepper","Sweetness"]},
  {"name":"Famous Dominican 2000 Robusto Habano","brand":"Famous Dominican","strength":6,"priceRange":"$5-$7","flavorNotes":["Cedar","Nuts","Cream","Spice"]},
  {"name":"Famous Dominican 2000 Robusto San Andres","brand":"Famous Dominican","strength":7,"priceRange":"$5-$7","flavorNotes":["Earth","Chocolate","Pepper","Leather"]},
  {"name":"Famous Dominican 2000 Gordo Habano","brand":"Famous Dominican","strength":6,"priceRange":"$6-$9","flavorNotes":["Cedar","Cream","Nuts","Light Spice"]},
  {"name":"Famous Dominican 2000 Gordo San Andres","brand":"Famous Dominican","strength":7,"priceRange":"$6-$9","flavorNotes":["Dark Chocolate","Earth","Spice","Pepper"]},
  {"name":"Famous Dominican 3000 Robusto","brand":"Famous Dominican","strength":6,"priceRange":"$4-$7","flavorNotes":["Cedar","Earth","Spice","Cream"]},
  {"name":"Famous Dominican 3000 Toro","brand":"Famous Dominican","strength":6,"priceRange":"$5-$8","flavorNotes":["Cedar","Nuts","Spice","Earth"]},
  {"name":"Famous Dominican 3000 Churchill","brand":"Famous Dominican","strength":6,"priceRange":"$5-$8","flavorNotes":["Cedar","Cream","Nuts","Spice"]},
  {"name":"Famous Dominican 3000 Gordo","brand":"Famous Dominican","strength":6,"priceRange":"$6-$9","flavorNotes":["Earth","Cedar","Nuts","Spice"]},
  {"name":"Famous Nicaraguan 5000 Sixty","brand":"Famous Nicaraguan","strength":8,"priceRange":"$5-$8","flavorNotes":["Earth","Dark Chocolate","Leather","Spice","Coffee"]},
  {"name":"Famous Nicaraguan 5000 Robusto","brand":"Famous Nicaraguan","strength":7,"priceRange":"$4-$7","flavorNotes":["Earth","Pepper","Cedar","Coffee"]},
  {"name":"Famous Nicaraguan 5000 Toro","brand":"Famous Nicaraguan","strength":7,"priceRange":"$5-$8","flavorNotes":["Earth","Spice","Leather","Coffee"]},
  {"name":"El Gueguense Famous Exclusivo Toro","brand":"Foundation","strength":7,"priceRange":"$10-$14","flavorNotes":["Earth","Caramel","Coffee","Pepper","Nuts"]},
  {"name":"Southern Draw Desert Rose Exclusivo Toro","brand":"Southern Draw","strength":6,"priceRange":"$9-$13","flavorNotes":["Oak","Sweetness","Floral","Spice","Cream"]},
  {"name":"Alec Bradley Mata Fina Robusto","brand":"Alec Bradley","strength":8,"priceRange":"$7-$11","flavorNotes":["Earth","Sweetness","Spice","Cream","Leather"]},
  {"name":"Oliva Inferno Robusto","brand":"Oliva","strength":8,"priceRange":"$6-$9","flavorNotes":["Earth","Dark Chocolate","Wood","Leather","Spice"]},
  {"name":"Perdomo Cuban Parejo Rothschild","brand":"Perdomo","strength":6,"priceRange":"$5-$8","flavorNotes":["Cedar","Coffee","Cream","Caramel","Nuts"]},
  {"name":"Rocky Patel American Market Selection Robusto","brand":"Rocky Patel","strength":5,"priceRange":"$6-$9","flavorNotes":["Cream","Cedar","Nuts","Sweetness"]},
  {"name":"Romeo y Julieta Capulet Toro","brand":"Romeo y Julieta","strength":6,"priceRange":"$6-$9","flavorNotes":["Cream","Nuts","Cedar","Sweetness","Spice"]},
  {"name":"Don Tomas SEC Robusto","brand":"Don Tomas","strength":5,"priceRange":"$4-$6","flavorNotes":["Cream","Toast","Cedar","Nuts","Spice"]},
  {"name":"Plasencia Immortal Robusto","brand":"Plasencia","strength":7,"priceRange":"$6-$9","flavorNotes":["Sweetness","Spice","Earth","Cedar"]},
  {"name":"Aganorsa Leaf Famous 80th Anniversary Robusto","brand":"Aganorsa Leaf","strength":7,"priceRange":"$8-$12","flavorNotes":["Coffee","Bread","Fruit","Floral","Pepper"]},
  {"name":"Punch Sucker Punch Robusto","brand":"Punch","strength":7,"priceRange":"$10-$14","flavorNotes":["Earth","Cedar","Spice","Leather"]},
  {"name":"Punch Sucker Punch Toro","brand":"Punch","strength":7,"priceRange":"$12-$16","flavorNotes":["Earth","Spice","Cedar","Pepper","Leather"]},
  {"name":"7 Deadly Sins Robusto","brand":"7 Deadly","strength":8,"priceRange":"$12-$16","flavorNotes":["Dark Chocolate","Pepper","Earth","Leather","Spice"]},
  {"name":"7 Deadly Sins Toro","brand":"7 Deadly","strength":8,"priceRange":"$13-$17","flavorNotes":["Dark Chocolate","Earth","Spice","Coffee","Pepper"]},
  {"name":"Famous VSL Nicaragua Toro","brand":"Famous Exclusives","strength":7,"priceRange":"$4-$7","flavorNotes":["Earth","Pepper","Spice","Cedar"]},
  {"name":"La Gloria Cubana Gilded Age Gordo","brand":"La Gloria Cubana","strength":7,"priceRange":"$12-$16","flavorNotes":["Earth","Cedar","Spice","Cream","Leather"]},
  {"name":"Asylum Lobotomy Corojo Double Toro","brand":"Asylum","strength":8,"priceRange":"$7-$10","flavorNotes":["Pepper","Earth","Spice","Dark Chocolate","Leather"]},
  {"name":"AJ Fernandez New World Dorado Toro","brand":"AJ Fernandez","strength":7,"priceRange":"$9-$13","flavorNotes":["Earth","Sweetness","Spice","Leather","Cedar"]},
  {"name":"Tabak Especial Dulce Toro","brand":"Drew Estate","strength":5,"priceRange":"$8-$11","flavorNotes":["Espresso","Cream","Chocolate","Sweetness"]},
  {"name":"Kentucky Fire Cured Robusto","brand":"Drew Estate","strength":8,"priceRange":"$8-$12","flavorNotes":["Smoke","Earth","Leather","Pepper","Dark Chocolate"]},
  {"name":"Perdomo Habano Bourbon Barrel-Aged Maduro Toro","brand":"Perdomo","strength":7,"priceRange":"$9-$13","flavorNotes":["Dark Chocolate","Coffee","Earth","Sweetness","Leather"]},
  {"name":"Davidoff Nicaragua Robusto","brand":"Davidoff","strength":7,"priceRange":"$18-$24","flavorNotes":["Pepper","Coffee","Chocolate","Spice","Cream"]},
  {"name":"Davidoff Escurio Gran Toro","brand":"Davidoff","strength":7,"priceRange":"$20-$28","flavorNotes":["Dark Chocolate","Coffee","Spice","Earth"]},
  {"name":"Long Live The Queen Ace of Spades","brand":"Caldwell","strength":7,"priceRange":"$12-$16","flavorNotes":["Cedar","Cream","Sweetness","Spice"]},
  {"name":"Caldwell Eastern Standard Robusto","brand":"Caldwell","strength":6,"priceRange":"$11-$15","flavorNotes":["Cedar","Nuts","Cream","Pepper"]},
  {"name":"Cohiba Nicaragua Robusto","brand":"Cohiba","strength":7,"priceRange":"$12-$16","flavorNotes":["Pepper","Earth","Spice","Cedar","Coffee"]},
  {"name":"Partagas Black Label Robusto","brand":"Partagas","strength":8,"priceRange":"$8-$12","flavorNotes":["Earth","Leather","Pepper","Spice","Coffee"]},
  {"name":"Partagas 1845 Extra Fuerte Toro","brand":"Partagas","strength":9,"priceRange":"$9-$13","flavorNotes":["Pepper","Earth","Leather","Coffee","Dark Chocolate"]},
  {"name":"Don Pepin Garcia Blue Label Robusto","brand":"Don Pepin Garcia","strength":8,"priceRange":"$8-$12","flavorNotes":["Pepper","Earth","Coffee","Leather","Spice"]},
  {"name":"Don Pepin Garcia Series JJ Toro","brand":"Don Pepin Garcia","strength":9,"priceRange":"$9-$13","flavorNotes":["Pepper","Earth","Spice","Coffee","Leather"]},
  {"name":"Montecristo Platinum Robusto","brand":"Montecristo","strength":6,"priceRange":"$10-$14","flavorNotes":["Cedar","Cream","Nuts","Spice","Earth"]},
  {"name":"H. Upmann Vintage Cameroon Robusto","brand":"H. Upmann","strength":6,"priceRange":"$10-$14","flavorNotes":["Sweetness","Cedar","Nuts","Spice","Cream"]},
  {"name":"Crux Bull & Bear Robusto","brand":"Crux","strength":7,"priceRange":"$10-$14","flavorNotes":["Pepper","Earth","Leather","Coffee","Spice"]},
  {"name":"Crux Du Connoisseur No. 3","brand":"Crux","strength":6,"priceRange":"$12-$16","flavorNotes":["Cedar","Cream","Nuts","Floral","Spice"]},
  {"name":"Oscar Valladares Leaf by Oscar Connecticut Toro","brand":"Oscar Valladares","strength":5,"priceRange":"$7-$10","flavorNotes":["Cream","Cedar","Nuts","Floral"]},
  {"name":"Oscar Valladares Leaf by Oscar Maduro Toro","brand":"Oscar Valladares","strength":7,"priceRange":"$7-$10","flavorNotes":["Dark Chocolate","Earth","Coffee","Sweetness"]},
  {"name":"ADVentura The Conqueror Robusto","brand":"ADVentura","strength":7,"priceRange":"$11-$15","flavorNotes":["Spice","Leather","Earth","Coffee","Cedar"]},
  {"name":"ADVentura The Navigator Toro","brand":"ADVentura","strength":6,"priceRange":"$10-$14","flavorNotes":["Cedar","Cream","Nuts","Sweetness","Spice"]},
  {"name":"Gran Habano Corojo #5 Robusto","brand":"Gran Habano","strength":8,"priceRange":"$7-$10","flavorNotes":["Pepper","Earth","Spice","Leather","Coffee"]},
  {"name":"Warped Futuro Robusto","brand":"Warped","strength":6,"priceRange":"$10-$14","flavorNotes":["Cedar","Cream","Pepper","Nuts","Sweetness"]},
  {"name":"Warped Maestro del Tiempo 6102 Toro","brand":"Warped","strength":7,"priceRange":"$14-$18","flavorNotes":["Cedar","Earth","Spice","Coffee","Leather"]},
  {"name":"Fratello Navetta Espressivo Robusto","brand":"Fratello","strength":7,"priceRange":"$8-$12","flavorNotes":["Espresso","Cocoa","Spice","Earth","Cream"]},
  {"name":"Southern Draw Cedrus Robusto","brand":"Southern Draw","strength":6,"priceRange":"$9-$13","flavorNotes":["Cedar","Sweetness","Cream","Nuts","Spice"]},
  {"name":"Southern Draw Rose of Sharon Habano Robusto","brand":"Southern Draw","strength":6,"priceRange":"$9-$12","flavorNotes":["Sweetness","Floral","Cedar","Cream","Spice"]},
  {"name":"Crowned Heads Jericho Hill Willy Lee Robusto","brand":"Crowned Heads","strength":8,"priceRange":"$14-$18","flavorNotes":["Earth","Pepper","Leather","Dark Chocolate","Spice"]},
  {"name":"Crowned Heads Le Patite Debutante Robusto","brand":"Crowned Heads","strength":5,"priceRange":"$11-$15","flavorNotes":["Cream","Cedar","Floral","Nuts","Sweetness"]},
  {"name":"Brick House Mighty Mighty Gordo","brand":"Brick House","strength":7,"priceRange":"$7-$10","flavorNotes":["Earth","Leather","Cedar","Spice","Coffee"]},
  {"name":"Diesel Whiskey Row Robusto","brand":"Diesel","strength":7,"priceRange":"$8-$12","flavorNotes":["Oak","Sweetness","Vanilla","Spice","Earth"]},
  {"name":"Diesel Hair of the Dog Robusto","brand":"Diesel","strength":8,"priceRange":"$9-$13","flavorNotes":["Pepper","Earth","Dark Chocolate","Leather","Spice"]}
];




// ---------------------------------------------------------------------------
// Rate limiting — simple in-memory IP counter.
// Netlify spins up multiple Lambda instances so this isn't perfect across
// instances, but it stops runaway single-client abuse effectively.
// Limit: 30 requests per IP per 60-second window.
// ---------------------------------------------------------------------------

const RATE_LIMIT_MAX      = 30;   // requests
const RATE_LIMIT_WINDOW   = 60 * 1000; // 1 minute in ms
const rateLimitMap = new Map(); // { ip -> { count, windowStart } }

function isRateLimited(ip) {
  const now  = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// ---------------------------------------------------------------------------
// OpenAI — true AI selection + explanation in a single call.
//
// Flow:
//   1. Scoring engine pre-filters 184 cigars → top 20 candidates
//   2. GPT receives all 20 + the raw user query
//   3. GPT picks the best 6 (handles nuance the scorer can't)
//   4. GPT writes a one-sentence "why" for each of those 6
//   5. Returns { selected: [{index, why}, ...] } — we map back to cigars
//
// Falls back to scorer-only (top 6, no why) if API key absent or call fails.
// ---------------------------------------------------------------------------

function strengthLabel(s) {
  if (s <= 5) return 'mild';
  if (s <= 7) return 'medium';
  if (s <= 8) return 'full-bodied';
  return 'extra full-bodied';
}

async function aiSelectAndExplain(query, candidates) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { results: candidates.slice(0, 6).map(c => ({ ...c, why: null })), aiUsed: false };

  const cigarList = candidates.map((c, i) =>
    `${i}: ${c.name} by ${c.brand} | ${strengthLabel(c.strength)} | ${c.priceRange} | notes: ${c.flavorNotes.join(', ')}`
  ).join('\n');

  const prompt = `You are an expert cigar sommelier at a premium retailer.

A customer typed: "${query}"

First, read the intent:
- If the query describes a food or drink (bourbon, espresso, steak, red wine, scotch, IPA, coffee, etc.) — treat this as a PAIRING request. Select cigars that complement or contrast the flavors of that item using classic pairing principles.
- If the query describes a cigar, brand, flavor profile, occasion, or preference (spicy, full body, like a Padron, after dinner smoke, gift for someone, etc.) — treat this as a PREFERENCE request. Select cigars that best match that taste or need.
- If it's both (e.g. "bourbon and spicy") — honor both signals.

Pairing principles to apply when relevant:
- Bourbon/whiskey → oak, leather, vanilla, caramel notes complement; pepper and spice contrast nicely
- Espresso/coffee → echo with cocoa, chocolate, cream; avoid floral or citrus
- Steak/red meat → bold, full-bodied, earthy to match the richness
- Red wine → full-bodied and spicy for tannic reds; medium for lighter reds
- Scotch/single malt → leather, earth, oak to echo smokiness and complexity
- Craft IPA → spice and pepper to match the hops
- Light fare/seafood → mild, creamy, strength under 6

Here are ${candidates.length} candidates (index: name | strength | price | notes):
${cigarList}

Your task:
1. Select the 6 cigars that best serve the customer's intent
2. For each, write ONE sentence (max 18 words) explaining why. Be specific — mention the flavor connection, pairing chemistry, or profile match. Use second person.

Rules:
- Exactly 6 selections
- Use the exact index numbers above
- Vary strength and price across selections
- Never explain what the cigar tastes like in isolation — always connect it to what the customer asked for

Respond with ONLY valid JSON, no markdown:
{"selected":[{"index":0,"why":"..."},{"index":3,"why":"..."}]}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error('OpenAI error:', res.status, await res.text());
      return { results: candidates.slice(0, 6).map(c => ({ ...c, why: null })), aiUsed: false };
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}';
    const cleaned = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '').trim();
    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed.selected) || parsed.selected.length === 0) {
      throw new Error('Invalid response shape from GPT');
    }

    // Map GPT's index selections back to actual cigar objects
    const results = parsed.selected
      .filter(s => typeof s.index === 'number' && candidates[s.index])
      .slice(0, 6)
      .map(s => ({
        ...candidates[s.index],
        why: typeof s.why === 'string' ? s.why : null,
      }));

    // Pad to 6 if GPT returned fewer (shouldn't happen, but safe)
    if (results.length < 6) {
      const usedIndexes = new Set(parsed.selected.map(s => s.index));
      const extras = candidates
        .filter((_, i) => !usedIndexes.has(i))
        .slice(0, 6 - results.length)
        .map(c => ({ ...c, why: null }));
      results.push(...extras);
    }

    return { results, aiUsed: true };

  } catch (err) {
    console.error('OpenAI selection failed:', err.message);
    return { results: candidates.slice(0, 6).map(c => ({ ...c, why: null })), aiUsed: false };
  }
}

// ---------------------------------------------------------------------------
// Brand alias map + accent normalization for fuzzy exclusion.
// Covers misspellings, accent variants, and common shorthand.
// Each entry maps one or more aliases → the canonical normalized brand token.
// We normalize BOTH the query tokens AND the cigar brand/name before matching.
// ---------------------------------------------------------------------------

function stripAccents(str) {
  // Decompose unicode then strip combining diacritics (é→e, ó→o, ñ→n, etc.)
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normForExclusion(str) {
  return stripAccents(norm(str)).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

// alias → canonical (both already accent-stripped + lowercased)
const BRAND_ALIASES = {
  // Padron
  'padron':           'padron',
  'padrón':           'padron',
  'padron 1926':      'padron',
  'padron 1964':      'padron',
  'serie 1926':       'padron',

  // Arturo Fuente / Opus X
  'fuente':           'arturo fuente',
  'arturo fuente':    'arturo fuente',
  'opus x':           'arturo fuente',
  'opusx':            'arturo fuente',
  'opus':             'arturo fuente',
  'fuente fuente':    'arturo fuente',
  'don carlos':       'arturo fuente',
  'hemingway':        'arturo fuente',

  // Liga Privada / Drew Estate
  'liga privada':     'drew estate',
  'liga':             'drew estate',
  'liga9':            'drew estate',
  'liga 9':           'drew estate',
  'no 9':             'drew estate',
  'undercrown':       'drew estate',
  'acid':             'drew estate',
  'drew estate':      'drew estate',

  // Oliva
  'oliva':            'oliva',
  'serie v':          'oliva',
  'serie o':          'oliva',
  'serie g':          'oliva',
  'melanio':          'oliva',
  'cain':             'oliva',

  // My Father
  'my father':        'my father',
  'le bijou':         'my father',
  'flor de las antillas': 'my father',

  // Rocky Patel
  'rocky patel':      'rocky patel',
  'rocky':            'rocky patel',

  // Alec Bradley
  'alec bradley':     'alec bradley',
  'prensado':         'alec bradley',
  'black market':     'alec bradley',

  // Davidoff
  'davidoff':         'davidoff',
  'winston churchill':'davidoff',

  // EP Carrillo
  'ep carrillo':      'ep carrillo',
  'e p carrillo':     'ep carrillo',
  'carrillo':         'ep carrillo',

  // La Flor Dominicana
  'la flor dominicana': 'la flor dominicana',
  'lfd':              'la flor dominicana',
  'la flor':          'la flor dominicana',
  'andalusian bull':  'la flor dominicana',

  // Perdomo
  'perdomo':          'perdomo',

  // Camacho
  'camacho':          'camacho',

  // Ashton
  'ashton':           'ashton',
  'vsg':              'ashton',

  // Plasencia
  'plasencia':        'plasencia',
  'alma fuerte':      'plasencia',
  'alma del fuego':   'plasencia',

  // Crowned Heads
  'crowned heads':    'crowned heads',
  'four kicks':       'crowned heads',
  'mil dias':         'crowned heads',

  // Joya de Nicaragua
  'joya de nicaragua':'joya de nicaragua',
  'joya':             'joya de nicaragua',
  'antano':           'joya de nicaragua',
  'antaño':           'joya de nicaragua',

  // Tatuaje
  'tatuaje':          'tatuaje',

  // Foundation
  'foundation':       'foundation',
  'tabernacle':       'foundation',
  'el gueguense':     'foundation',
  'wise man':         'foundation',

  // Illusione
  'illusione':        'illusione',

  // Cohiba
  'cohiba':           'cohiba',

  // Montecristo
  'montecristo':      'montecristo',

  // H. Upmann
  'h upmann':         'h upmann',
  'h. upmann':        'h upmann',
  'upmann':           'h upmann',

  // Romeo y Julieta
  'romeo y julieta':  'romeo y julieta',
  'romeo':            'romeo y julieta',

  // Hoyo de Monterrey
  'hoyo de monterrey':'hoyo de monterrey',
  'hoyo':             'hoyo de monterrey',

  // CAO
  'cao':              'cao',
  'flathead':         'cao',

  // Room101
  'room101':          'room101',
  'room 101':         'room101',

  // Warped
  'warped':           'warped',

  // Aganorsa
  'aganorsa':         'aganorsa leaf',
  'aganorsa leaf':    'aganorsa leaf',

  // Diesel
  'diesel':           'diesel',

  // Macanudo
  'macanudo':         'macanudo',

  // Punch
  'punch':            'punch',

  // Aging Room
  'aging room':       'aging room',
  'quattro':          'aging room',

  // Dunbarton
  'dunbarton':        'dunbarton tobacco trust',
  'sobremesa':        'dunbarton tobacco trust',
  'umbagog':          'dunbarton tobacco trust',
};

// Build a reverse lookup: canonical brand token → true
// so we can check if a query token matches any brand
const CANONICAL_BRANDS = new Set(
  ALL_CIGARS.map(c => normForExclusion(c.brand))
);

function queryMatchesCigar(queryToken, cigar) {
  const brandNorm = normForExclusion(cigar.brand);
  const nameNorm  = normForExclusion(cigar.name);
  const t         = normForExclusion(queryToken);
  if (t.length < 3) return false;

  // Direct substring match (accent-stripped)
  if (brandNorm.includes(t) || nameNorm.includes(t)) return true;

  // Alias lookup → canonical brand comparison
  const canonical = BRAND_ALIASES[t];
  if (canonical) {
    const canonicalBrand = normForExclusion(canonical);
    if (brandNorm.includes(canonicalBrand) || canonicalBrand.includes(brandNorm)) return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Flavor synonym map — query terms → flavor note keywords in the data
// ---------------------------------------------------------------------------
const FLAVOR_SYNONYMS = {
  chocolate:    ["chocolate", "cocoa", "espresso", "coffee"],
  cocoa:        ["cocoa", "chocolate"],
  espresso:     ["espresso", "coffee", "cocoa"],
  coffee:       ["coffee", "espresso", "cocoa"],
  sweet:        ["sweetness", "caramel", "honey", "cream"],
  caramel:      ["caramel", "sweetness", "honey"],
  honey:        ["honey", "sweetness", "caramel"],
  cream:        ["cream", "caramel", "nuts"],
  creamy:       ["cream", "caramel", "nuts"],
  vanilla:      ["sweetness", "cream", "caramel"],
  earth:        ["earth", "leather", "cedar"],
  earthy:       ["earth", "leather", "cedar"],
  wood:         ["cedar", "oak", "earth"],
  woody:        ["cedar", "oak", "earth"],
  cedar:        ["cedar", "oak"],
  oak:          ["oak", "cedar"],
  leather:      ["leather", "earth"],
  spice:        ["spice", "pepper"],
  spicy:        ["spice", "pepper"],
  pepper:       ["pepper", "spice"],
  peppery:      ["pepper", "spice"],
  nuts:         ["nuts", "hazelnut", "cream"],
  nutty:        ["nuts", "hazelnut"],
  hazelnut:     ["hazelnut", "nuts"],
  mild:         ["cream", "cedar", "nuts", "floral"],
  smooth:       ["cream", "caramel", "honey", "nuts"],
  light:        ["cream", "floral", "cedar"],
  floral:       ["floral", "honey", "sweetness"],
  orange:       ["orange", "sweetness"],
  bread:        ["bread", "cream", "nuts"],
};

// Strength keywords → [min, max] on the 4–10 scale
const STRENGTH_KEYWORDS = {
  "full body": [8, 10], "full-bodied": [8, 10], fullbodied: [8, 10],
  full: [8, 10], strong: [8, 10],
  "medium full": [6, 8], "medium-full": [6, 8],
  medium: [5, 7], "medium body": [5, 7], "medium-bodied": [5, 7],
  mild: [4, 5], mellow: [4, 5], light: [4, 5],
};

// Price keywords → price-range lower-bound band
const PRICE_KEYWORDS = {
  budget: [0, 7], cheap: [0, 7], affordable: [0, 9],
  "mid range": [7, 13], "mid-range": [7, 13], midrange: [7, 13],
  premium: [12, 20], luxury: [16, 999], expensive: [16, 999],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parsePriceLow(priceRange) {
  const m = String(priceRange || "").match(/\$(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function norm(str) {
  return String(str || "").toLowerCase().trim();
}

function tokenize(query) {
  const words = query.toLowerCase().replace(/[^a-z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean);
  const bigrams = words.slice(0, -1).map((w, i) => `${w} ${words[i + 1]}`);
  return [...bigrams, ...words];
}

function getCigarKey(cigar) {
  return `${norm(cigar.brand)}::${norm(cigar.name)}`;
}

function scoreCigar(cigar, tokens) {
  let score = 0;
  const notes    = cigar.flavorNotes.map(n => n.toLowerCase());
  const brandLow = norm(cigar.brand);
  const nameLow  = norm(cigar.name);
  const strength = cigar.strength;
  const priceLow = parsePriceLow(cigar.priceRange);

  for (const token of tokens) {
    if (brandLow.includes(token) || nameLow.includes(token)) { score += 10; continue; }

    const sRange = STRENGTH_KEYWORDS[token];
    if (sRange) {
      score += (strength >= sRange[0] && strength <= sRange[1]) ? 6 : -2;
      continue;
    }

    const pRange = PRICE_KEYWORDS[token];
    if (pRange) {
      if (priceLow >= pRange[0] && priceLow <= pRange[1]) score += 5;
      continue;
    }

    const synonymTargets = FLAVOR_SYNONYMS[token];
    if (synonymTargets) {
      score += synonymTargets.filter(t => notes.includes(t)).length * 4;
      continue;
    }

    if (notes.includes(token)) { score += 4; continue; }
    if (notes.some(n => n.includes(token) || token.includes(n))) score += 2;
  }

  return score;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

exports.handler = async function (event) {
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "content-type,authorization",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST")    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };

  // Rate limit check
  const clientIp = event.headers?.['x-forwarded-for']?.split(',')[0].trim()
                || event.headers?.['client-ip']
                || 'unknown';
  if (isRateLimited(clientIp)) {
    return { statusCode: 429, headers: CORS, body: JSON.stringify({ error: "Too many requests — please wait a moment." }) };
  }

  try {
    const body     = JSON.parse(event.body || "{}");
    const rawQuery = String(body.query || body.cigarName || "").trim();
    const disliked = Array.isArray(body.disliked) ? body.disliked.map(norm) : [];
    const seen     = Array.isArray(body.seen)     ? body.seen.map(norm)     : [];

    const excluded   = new Set([...disliked, ...seen]);
    const queryLower = norm(rawQuery);
    const tokens     = tokenize(rawQuery);

    // Build token list for fuzzy brand exclusion:
    // includes individual words, bigrams, trigrams, and the full query
    // so multi-word aliases like 'opus x', 'liga privada', 'my father' all match.
    const rawWords = normForExclusion(rawQuery).split(' ').filter(Boolean);
    const queryExclusionTokens = [
      ...rawWords,
      ...rawWords.slice(0,-1).map((w,i) => `${w} ${rawWords[i+1]}`),          // bigrams
      ...rawWords.slice(0,-2).map((w,i) => `${w} ${rawWords[i+1]} ${rawWords[i+2]}`), // trigrams
      normForExclusion(rawQuery),  // full query
    ].filter(t => t.length > 2);

    function isQueryCigar(c) {
      return queryExclusionTokens.some(t => queryMatchesCigar(t, c));
    }

    // Build candidate pool — exclude seen/disliked and any cigar named in the query
    let pool = ALL_CIGARS.filter(c => {
      const key = getCigarKey(c);
      if (excluded.has(key)) return false;
      if (isQueryCigar(c)) return false;
      return true;
    });

    // Shuffle first to randomise ties, then sort by score (descending)
    shuffle(pool);

    if (tokens.length > 0) {
      pool = pool
        .map(c => ({ c, score: scoreCigar(c, tokens) }))
        .sort((a, b) => b.score - a.score)
        .map(({ c }) => c);
    }

    // Deduplicate by brand — keep only the highest-scoring cigar per brand
    // so recommendation cards never show two cigars from the same maker.
    const seenBrands = new Set();
    pool = pool.filter(c => {
      const brand = norm(c.brand);
      if (seenBrands.has(brand)) return false;
      seenBrands.add(brand);
      return true;
    });

    // Pre-filter to top 20 candidates for GPT — broad enough for nuance,
    // small enough to keep tokens low and latency fast
    let candidates = pool.slice(0, 20);

    if (candidates.length < 6) {
      const used = new Set(candidates.map(getCigarKey));
      const backup = shuffle(
        ALL_CIGARS.filter(c => {
          if (used.has(getCigarKey(c))) return false;
          if (isQueryCigar(c)) return false;
          return true;
        })
      );
      candidates = candidates.concat(backup).slice(0, 20);
    }

    // GPT selects the best 6 from the 20 candidates and writes a why for each.
    // Falls back to top-6 scorer results with no why if AI is unavailable.
    const { results } = await aiSelectAndExplain(rawQuery || 'cigar recommendation', candidates);

    return { statusCode: 200, headers: CORS, body: JSON.stringify(results) };

  } catch (err) {
    console.error("recommend error:", err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "Server error" }) };
  }
};
