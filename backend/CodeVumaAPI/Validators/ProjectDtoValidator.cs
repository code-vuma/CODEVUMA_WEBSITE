using FluentValidation;
using CodeVumaAPI.Controllers;

namespace CodeVumaAPI.Validators
{
    public class ProjectDtoValidator : AbstractValidator<ProjectDto>
    {
        public ProjectDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(2000).WithMessage("Description must not exceed 2000 characters.");

            RuleFor(x => x.Url)
                .MaximumLength(500).WithMessage("URL must not exceed 500 characters.")
                .Must(v => v == null || Uri.TryCreate(v, UriKind.Absolute, out _))
                .WithMessage("URL must be a valid absolute URL.")
                .When(x => !string.IsNullOrWhiteSpace(x.Url));

            RuleFor(x => x.ImageUrl)
                .MaximumLength(500).WithMessage("Image URL must not exceed 500 characters.")
                .Must(v => v == null || Uri.TryCreate(v, UriKind.Absolute, out _))
                .WithMessage("Image URL must be a valid absolute URL.")
                .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
        }
    }
}
