## Setup project structure [x]

## Seed DB with quotes [x]

- Create a DB

  This will be one time process
  We need ~1000 quotes

## Database design [x]

- Quotes
  - id uuid
  - content string
  - author string
  - author_slug string
  - tags string[]
  - length

## API design [x]

1. /quotes/random
   Get random quotes

- Query params:

  - maxLength - max length of quote
  - minLength - min length of quote
  - limit - number of quotes to return
  - skip - skip number of quote
  - tags - type of quote

## Things to use:

- Logs Visualization:

  1. Sentry + Winston
  2. https://www.loggly.com/

- API Analytics - This w
  1. https://www.moesif.com/
  2. https://newrelic.com/
