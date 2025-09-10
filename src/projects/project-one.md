---
title: Market Trend Analysis
summary: Analyzed sales data to identify key market trends and provide actionable growth strategies


# --- SEO & Social Media ---
description: "A detailed, keyword-rich sentence for Google search results and social media previews."
keywords: ["keyword 1", "data analysis", "case study", "your name"]
tags: ["SQL", "Python", "Power BI"]


layout:  post-layout.njk
date: 2025-08-30

#images
featuredImage: /img/projects/market-trend/market-trend-card.png
headerImage: /img/projects/market-trend/market-trend-header.png
ogImage: /img/projects/market-trend/market-trend-social.png
---

This is the content for the project's own page.

This is the main content for the project page itself. You can write a detailed case study here.


Here is the SQL query I used to aggregate the sales data:

```sql
SELECT
    product_category,
    SUM(sales_amount) AS total_sales,
    AVG(customer_rating) AS avg_rating
FROM
    sales_records
WHERE
    sale_date >= '2025-01-01'
GROUP BY
    product_category
ORDER BY
    total_sales DESC;
```

And here is a snippet of the Python code used for the analysis:

```python
import pandas as pd

# Load the dataset
df = pd.read_csv('sales_data.csv')

# Display the first 5 rows
print(df.head())
```