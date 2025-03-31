import scrapy

class StockMarketSpider(scrapy.Spider):

    def __init__(self, name = 'stock-market-spider', source_url='', max_pages=1, **kwargs):
        self.name = name
        self.start_urls = [source_url]
        self.max_pages = max_pages
        self.current_page = 1

        print(f"{name} initiating")
        super().__init__(**kwargs)  # python3

    def parse(self, response):

        # Extracting the header
        header = response.css('tr')[0].css('th ::text').getall()
        hlen = len(header)

        # Extracting the content
        tcontent = response.css('tr')[1:]

        # Yielding the table as a dict
        for trow in tcontent:
            trow = trow.css('td ::text').getall()
            d = {}
            for i in range(hlen):
                d[header[i]] = trow[i]
            yield d

        # Continuing if there are more pages
        next_page = response.css('.pages_right::attr(href)').get()

        print(f"current page : {self.current_page}")

        if ( next_page is not None ) and ( self.current_page < self.max_pages ):
            self.current_page+=1
            next_page = response.urljoin( next_page )
            yield scrapy.Request(next_page, callback=self.parse)