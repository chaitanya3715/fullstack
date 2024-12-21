from django.core.management.base import BaseCommand
from scraper.dice_scraper import run_spider

class Command(BaseCommand):
    help = 'Scrape jobs from Dice.com'

    def handle(self, *args, **options):
        self.stdout.write('Starting job scraper...')
        run_spider()
        self.stdout.write(self.style.SUCCESS('Successfully scraped jobs'))