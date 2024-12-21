import scrapy
import json
import requests
from datetime import datetime
from scrapy.crawler import CrawlerProcess

class DiceJobSpider(scrapy.Spider):
    name = 'dice_jobs'
    api_url = 'https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search'
    headers = {
        'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
    }
    
    def start_requests(self):
        params = {
            'q': 'Software',
            'countryCode2': 'US',
            'radius': '30',
            'radiusUnit': 'mi',
            'page': '1',
            'pageSize': '20',
            'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
            'filters.workplaceTypes': 'Remote',
            'filters.employmentType': 'CONTRACTS',
            'filters.postedDate': 'ONE',
            'currencyCode': 'USD',
            'fields': 'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
            'culture': 'en',
            'recommendations': 'true',
            'interactionId': '0',
            'fj': 'true',
            'includeRemote': 'true',
        }
        
        yield scrapy.Request(
            f'{self.api_url}?{urllib.parse.urlencode(params)}',
            headers=self.headers,
            callback=self.parse
        )

    def parse(self, response):
        data = json.loads(response.text)
        
        for job in data.get('data', []):
            job_data = {
                'title': job.get('title'),
                'company': job.get('companyName'),
                'location': job.get('jobLocation', {}).get('displayName'),
                'description': job.get('summary'),
                'posted_date': job.get('postedDate'),
                'employment_type': job.get('employmentType'),
                'salary_range': job.get('salary'),
            }
            
            # Send to Django API
            requests.post(
                'http://localhost:8000/api/jobs/create/',
                json=job_data
            )

        # Handle pagination
        total_pages = data.get('meta', {}).get('totalPages', 1)
        current_page = data.get('meta', {}).get('currentPage', 1)
        
        if current_page < total_pages:
            next_page = current_page + 1
            params = dict(parse_qsl(urlparse(response.url).query))
            params['page'] = str(next_page)
            
            yield scrapy.Request(
                f'{self.api_url}?{urllib.parse.urlencode(params)}',
                headers=self.headers,
                callback=self.parse
            )

def run_spider():
    process = CrawlerProcess(
        settings={
            'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    )
    
    process.crawl(DiceJobSpider)
    process.start()